import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

const NotificationsDropdown = ({ setNotificationsDropdown, notificationsDropdown }) => {
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalRecord: 0,
    hasMore: false
  });
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const fetchNotifications = useCallback(async (page = 0, append = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/notification`,
        {
          params: { page, size: 10 },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = res?.data?.data;
      const content = responseData?.data ?? [];
      const totalRecord = responseData?.totalRecord ?? 0;

      if (append) {
        setNotifications(prev => [...prev, ...content]);
      } else {
        setNotifications(content);
      }
      const totalPages = responseData?.page ?? 0;
      
      const newCurrentPageNumber = append ? currentPageNumber + 1 : 0;
      setCurrentPageNumber(newCurrentPageNumber);
      
      const hasMore = newCurrentPageNumber < totalPages - 1;

      setPagination(prev => ({
        ...prev,
        page: totalPages, // Store total pages in pagination.page
        totalRecord,
        hasMore
      }));
    } catch (e) {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);


  const markAsRead = useCallback(
    async (notificationId) => {
      try {
        await axios.put(
          `${BASE_URL}/api/notification/${notificationId}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Update notification in place instead of refetching
        setNotifications(prev =>
          prev.map(notification =>
            notification.notificationId === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );
      } catch (_) {
        // no-op UI error; keep dropdown usable
      }
    },
    []
  );

  useEffect(() => {
    if (!notificationsDropdown) return;

    const handleOutsideClick = (event) => {
      // Don't close if clicking on the bell icon trigger
      if (event.target.closest('[data-bell-icon="true"]')) {
        console.log("clicked on the bell icon");
        return;
      }

      // Close if clicking outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    
        setNotificationsDropdown(false);
      }
    };

    // Add event listener immediately without timeout
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [notificationsDropdown, setNotificationsDropdown]);

  const handleLoadMore = useCallback(() => {
    if (pagination.hasMore && !loading) {
      fetchNotifications(currentPageNumber + 1, true);
    }
  }, [fetchNotifications, pagination.hasMore, currentPageNumber, loading]);

  useEffect(() => {
    if (notificationsDropdown) {
      setCurrentPageNumber(0); // Reset page number when dropdown opens
      fetchNotifications(0, false);
    }
  }, [notificationsDropdown]);


  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="w-[367px] max-h-[368px] bg-white rounded-[8px] border-[1px] border-[#0000000D] shadow-[0_0_0_1px_#0000000D] flex flex-col"
    >
      <div className="p-[16px] border-b border-[#0000000D]">
        <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#000000]">
          Notifications
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && notifications.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        )}
        {error && !loading && (
          <div className="p-4 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        {!loading && !error && notifications.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        )}
        {!loading && !error && notifications.map((notification) => (
          <div key={notification.notificationId} className="flex justify-center items-center w-[335px] min-h-[95px] py-[10px] border-b-[1px] border-[#0000000D] space-y-[10px]">
            <div className="flex justify-start items-start w-[335px]  gap-[5px]">
              <svg
                className="-mt-1"
                width="32"
                height="32"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32.525" rx="16" fill="white" />
                <path
                  d="M20.4994 14.6853V14.2002C20.4994 11.5364 18.485 9.37695 16 9.37695C13.515 9.37695 11.5006 11.5364 11.5006 14.2002V14.6853C11.5006 15.2675 11.3398 15.8367 11.0385 16.3212L10.3002 17.5083C9.62588 18.5926 10.1407 20.0665 11.3136 20.4094C14.3818 21.3064 17.6182 21.3064 20.6864 20.4094C21.8593 20.0665 22.3741 18.5926 21.6998 17.5083L20.9615 16.3212C20.6602 15.8367 20.4994 15.2675 20.4994 14.6853Z"
                  stroke="#434343"
                  stroke-width="0.8"
                />
                <path
                  d="M13 21.0823C13.4367 22.2857 14.615 23.1479 16 23.1479C17.385 23.1479 18.5633 22.2857 19 21.0823"
                  stroke="#434343"
                  stroke-width="0.8"
                  stroke-linecap="round"
                />
                <path
                  d="M16 12.1313V14.8855"
                  stroke="#434343"
                  stroke-width="0.8"
                />
              </svg>
              <div className="flex flex-col w-[293px] space-y-[4px]">
                <div className="flex items-center justify-between">
                  <p className="font-poppins font-medium text-[12px] leading-[18px] text-[#434343]">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </div>
                <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-outfit font-normal text-[10px] leading-[12.6px] text-[#949494]">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.notificationId)}
                      className="text-[10px] text-blue-700 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {pagination.hasMore && (
        <div className="p-4 border-t border-[#0000000D]">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="w-full py-2 px-4 bg-brand text-white rounded-lg hover:bg-brand/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-poppins text-sm"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;

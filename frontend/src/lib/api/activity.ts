export interface ActivityEntry {
  type: string;
  name: string;
  description?: string;
  duration?: number;
  difficulty?: number;
  feedback?: string;
  scheduledFor?: Date | null;
  status?: 'completed' | 'scheduled';
}

export interface Activity extends ActivityEntry {
  _id: string;
  timestamp: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: {
    activities: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      hasNext: boolean;
    };
  };
}
const API_BASE = process.env.NEXT_PUBLIC_API_URL ;
// Log new activity
export async function logActivity(
  data: ActivityEntry
): Promise<{ success: boolean; data: Activity; message: string }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`${API_BASE}/api/activity/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to log activity");
  }

  return response.json();
}

// Get upcoming activities
export async function getUpcomingActivities(
  limit = 10, 
  page = 1
): Promise<PaginatedResponse<Activity>> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(
    `${API_BASE}/api/activity/upcoming?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch upcoming activities");
  }

  return response.json();
}

// Get activity history
export async function getActivityHistory(
  limit = 10, 
  page = 1, 
  type?: string, 
  days?: number
): Promise<PaginatedResponse<Activity>> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    ...(type && { type }),
    ...(days && { days: days.toString() })
  });

  const response = await fetch(
    `${API_BASE}/api/activity/history?${params}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activity history");
  }

  return response.json();
}

// Get activity statistics
export async function getActivityStats(days = 30): Promise<{
  success: boolean;
  data: {
    summary: {
      totalActivities: number;
      upcomingCount: number;
      period: string;
    };
    byType: Array<{
      type: string;
      count: number;
      totalDuration: number;
      avgDifficulty: number;
    }>;
  };
}> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(
    `${API_BASE}/api/activity/stats?days=${days}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activity stats");
  }

  return response.json();
}

// Update activity status
export async function updateActivityStatus(
  activityId: string, 
  status: string, 
  feedback?: string
): Promise<{ success: boolean; data: Activity; message: string }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(
    `${API_BASE}/api/activity/${activityId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, feedback }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update activity status");
  }

  return response.json();
}
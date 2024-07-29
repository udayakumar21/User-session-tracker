const getMonthlyStats = (sessions, year) => {
    const monthlyStats = {};

    // Initialize monthly stats for each month in the given year
    for (let month = 0; month < 12; month++) {
        const monthKey = `${year}-${month + 1}`;
        monthlyStats[monthKey] = { loggedInUsers: new Set(), activeUsers: new Set() };
    }

    sessions.forEach(session => {
        const { userId, logged_in, logged_out, lastOpenedAt } = session;
        const loginStart = new Date(logged_in);
        const loginEnd = new Date(logged_out);
        const lastOpen = new Date(lastOpenedAt);

        for (let month = 0; month < 12; month++) {
            const startOfMonth = new Date(year, month, 1);
            const endOfMonth = new Date(year, month + 1, 0);

            const monthKey = `${year}-${month + 1}`;

            // Check if the session is logged in during the month
            if (loginStart <= endOfMonth && loginEnd >= startOfMonth) {
                monthlyStats[monthKey].loggedInUsers.add(userId);
            }

            // Check if the user was active during the month
            if (lastOpen >= startOfMonth && lastOpen <= endOfMonth) {
                monthlyStats[monthKey].activeUsers.add(userId);
            }
        }
    });

    // Convert Sets to Arrays for final output
    for (const monthKey in monthlyStats) {
        monthlyStats[monthKey].loggedInUsers = Array.from(monthlyStats[monthKey].loggedInUsers);
        monthlyStats[monthKey].activeUsers = Array.from(monthlyStats[monthKey].activeUsers);
    }

    return monthlyStats;
};

// Example usage
const sessions = [
    {
        deviceId: 'device1',
        userId: 'user1',
        logged_in: '2024-01-15T00:00:00Z',
        logged_out: '2024-06-20T00:00:00Z',
        lastOpenedAt: '2024-05-01T00:00:00Z'
    },
    {
        deviceId: 'device2',
        userId: 'user2',
        logged_in: '2024-02-10T00:00:00Z',
        logged_out: '2024-08-15T00:00:00Z',
        lastOpenedAt: '2024-07-01T00:00:00Z'
    }
];

console.log(getMonthlyStats(sessions, 2024));

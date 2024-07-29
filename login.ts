type UserSession = {
    deviceId: string;
    userId: string;
    logged_in: Date;
    logged_out: Date;
    lastOpenedAt: Date;
};

function getMonthlyStats(sessions: UserSession[], year: number): { [month: string]: { loggedInUsers: Set<string>, activeUsers: Set<string> } } {
    const monthlyStats: { [month: string]: { loggedInUsers: Set<string>, activeUsers: Set<string> } } = {};

    for (let month = 0; month < 12; month++) {
        const monthKey = `${year}-${month + 1}`;
        monthlyStats[monthKey] = { loggedInUsers: new Set<string>(), activeUsers: new Set<string>() };
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

            if (loginStart <= endOfMonth && loginEnd >= startOfMonth) {
                monthlyStats[monthKey].loggedInUsers.add(userId);
            }

            if (lastOpen >= startOfMonth && lastOpen <= endOfMonth) {
                monthlyStats[monthKey].activeUsers.add(userId);
            }
        }
    });

    return monthlyStats;
}

const sessions: UserSession[] = [
    {
        deviceId: 'device1',
        userId: 'user1',
        logged_in: new Date('2024-07-25'),
        logged_out: new Date('2024-07-26'),
        lastOpenedAt: new Date('2024-07-27')
    },
    {
        deviceId: 'device2',
        userId: 'user2',
        logged_in: new Date('2024-06-10'),
        logged_out: new Date('2024-06-15'),
        lastOpenedAt: new Date('2024-06-01')
    },
];

console.log(getMonthlyStats(sessions, 2024));

import React from 'react';
import CampusLayout from '../../layouts/CampusLayout';
import StatCard from '../../components/StatCard';

export default function Dashboard({ stats = {} }) {
    return (
        <CampusLayout title="Admin Dashboard" subtitle="Control room sederhana buat mantau CampusMate.">
            <div className="grid gap-5 md:grid-cols-3">
                <StatCard value={stats.users ?? 0} label="Users" detail="Registered accounts" icon="👥" />
                <StatCard value={stats.sessions ?? 0} label="Sessions" detail="Study sessions" icon="☕" />
                <StatCard value={stats.courses ?? 0} label="Courses" detail="Semester schedule" icon="📚" />
            </div>
        </CampusLayout>
    );
}

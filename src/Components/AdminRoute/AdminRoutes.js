import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AdminContext } from '../../contexts/AdminContext';

const AdminRoutes = ({ children }) => {
    const { admin } = useContext(AdminContext);
    let location = useLocation();
    // console.log(admin.role)

    if (admin?.role === "admin") {
        <Navigate to="/admin/dashboard" state={{ from: location }} />
        return children;
    }
    return <Navigate to="/admin/login" state={{ from: location }} />;
};

export default AdminRoutes;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AdminContext } from '../../contexts/AdminContext';

const AdminRoutes = ({ children }) => {
    const { admin } = useContext(AdminContext);
    let location = useLocation();
    console.log(admin)

    if (admin?._id) {
        <Navigate to="/admin/dashboard" state={{ from: location }} />
        console.log(admin?._id)
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoutes;
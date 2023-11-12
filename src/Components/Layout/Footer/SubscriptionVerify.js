import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SubscriptionVerify = () => {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
    if (token) {
      setLoading(true);
      axios
        .post(`https://backend.dslcommerce.com/api/mail/verify-email/${token}`)
        .then((res) => {
          if (res.status === 200) {
            setSuccess(res.data);
            setError();
          }
        })
        .catch((err) => {
          setSuccess();
          setError(err.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, navigate]);

  return (
    <div className="container py-4">
      {loading && (
        <div className="p-5 border border-2 border-primary text-center">
          <h1>
            Verifing...
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </h1>
          <span>Please wait</span>
        </div>
      )}

      {success && (
        <div className="p-5 border border-2 border-success text-center text-success">
          <h1>{success}</h1>
        </div>
      )}

      {error && (
        <div className="p-5 border border-2 border-danger text-center text-danger">
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default SubscriptionVerify;

import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("http://localhost:3000/api/dashboard");
  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const { data, error } = useSWR("dashboard", fetcher);

  if (error) return "Error";
  if (!data) return "Loading";
  return (
    <>
      <div>
        <h2>Dashboard</h2>
        <h2>Posts - {data.posts}</h2>
        <h2>Likes - {data.following}</h2>
      </div>
    </>
  );
};

export default Dashboard;

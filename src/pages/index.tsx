import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import React from "react";
import { GrGoogle } from "react-icons/gr";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Sign In With Google
        </h5>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center mr-2"
          >
            <GrGoogle></GrGoogle>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

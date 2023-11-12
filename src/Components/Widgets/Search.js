import React, { useState, useEffect } from "react";
import Preloader from "../Common/Preloader";

function Search({ handleSearch }) {

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div
          className="search-form w-100"
        >
          <div class="input-group mb-3">
            <input
              type="search"
              class="form-control"
              placeholder="Search..."

              onChange={(e) => handleSearch(e)}
              aria-label="Search by mail..."
              aria-describedby="basic-addon2"
            />

          </div>

        </div>
      </div>
    </>
  );
}

export default Search;

import { InboxIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// // import ReactLoading from "react-loading";
import { Link } from "gatsby";

export default function Achievements() {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  function getAchievementss() {
    axios
      .get("/api/achievements")
      .then((res) => {
        setItemsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  }
  useEffect(() => {
    getAchievementss();
    return;
  }, []);

  const deleteItem = (e: any, item: any) => {
    e.preventDefault();

    Swal.fire({
      title: "Delete Achievement",
      text: `Are you sure to delete ${item.title_en || item.title_fr} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/achievements/${item.id}`)
          .then((res) => {
            Swal.fire("Success", res.data.message, "success");
            getAchievementss();
          })
          .catch((err) => {
            if (err.response.data.status === 404) {
              Swal.fire("Erreur", err.response.data.message, "error");
            } else if (err.response.status === 401) {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      } else if (result.isDenied) {
      }
    });
  };
  if (loading) {
    return <div>Loading...</div>
  }
  const handleToggle = (item: any) => {
    const updatedStatus = item.status === "visible" ? "hidden" : "visible";


    axios
      .put(`/api/achievement/status/${item.slug}`, {
        status: updatedStatus,
      })
      .then((res) => {
        Swal.fire("Success", res.data.message, "success");

        // Update the local state only on success
        setItemsList((prevItems: any) =>
          prevItems.map((itm: any) =>
            itm.id === item.id ? { ...itm, status: updatedStatus } : itm
          )
        );

      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
      });
  };
  return (
    <>
      <div className="max-w-[80rem] p-2 sm:p-5 mx-auto">
        <div className="rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg">
            <h5 className="mb-3">Achievementss ( {itemsList.length} )</h5>
            <Link to="/admin/achievements/create" className="bg-blue-600 text-white p-2 rounded">
              Create Achievements
            </Link>
          </div>
          <div className="p-5">
            {itemsList?.length > 0 ? (
              <>
                <div className="grid grid-cols-12 items-center text-center border-b font-bold py-2 bg-gray-100">
                  <div className="hidden sm:block text-start col-span-1">ID</div>
                  <div className="text-start col-span-2">Image</div>
                  <div className="text-start col-span-3">Title</div>
                  <div className="text-start col-span-2">Date</div>

                  <div className="col-span-1">is_visible</div>
                  <div className="hidden sm:block text-end col-span-1">Actions</div>
                </div>

                <div className="divide-y">
                  {itemsList?.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-12 items-center text-center py-2">
                      <div className="hidden sm:block text-start col-span-1">{item.id}</div>
                      <div className="col-span-2 flex justify-center">
                        <img className="w-[70px] sm:w-[130px] md:w-[160px]"
                          src={`${process.env.GATSBY_API_URL}${item.image}`} alt="" />
                      </div>
                      <div className="text-start col-span-3 font-bold">
                        {item.title_en || item.title_fr}
                      </div>
                      <div className="col-span-2 text-start">{item.date}</div>
                      <div className="col-span-1">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            name="status"
                            checked={item.status === "visible"}
                            onChange={() => handleToggle(item)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      {/* Actions - Ensures Icons Stay Inline */}
                      <div className="hidden sm:flex col-span-1 justify-end sm:justify-center gap-3">
                        <Link to={`/admin/achievements/manage-achievement/${item.slug}`}>
                          <MagnifyingGlassIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </Link>

                        <Link to={`/admin/achievements/${item.slug}`}>
                          <PencilSquareIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </Link>
                        <button type="button" onClick={(e) => deleteItem(e, item)}>
                          <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>


            ) : (
              <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
                <InboxIcon className="block h-20 w-20" aria-hidden="true" />
                <h3 className="text-2xl font-bold">Theres no Achievements</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

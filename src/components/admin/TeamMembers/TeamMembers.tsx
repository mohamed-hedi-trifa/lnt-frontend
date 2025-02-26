import { InboxIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { Link } from "gatsby";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  function getTeamMembers() {
    axios
      .get("/api/team-members")
      .then((res) => {
        setItemsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  }
  useEffect(() => {
    getTeamMembers();
    return;
  }, []);

  const deleteItem = (e: any, item: any) => {
    e.preventDefault();

    Swal.fire({
      title: "Delete Member",
      text: `Are you sure to delete ${item.name} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/team-members/${item.id}`)
          .then((res) => {
            Swal.fire("Success", res.data.message, "success");
            getTeamMembers();
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
    return <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />;
  }

  return (
    <>
      <div className="max-w-[80rem] p-2 sm:p-5 mx-auto">
        <div className="rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg">
            <h5 className="mb-3">Team Members ( {itemsList.length} )</h5>
            <Link to="/admin/team-members/create" className="bg-blue-600 text-white p-2 rounded">
              Add a new member
            </Link>
          </div>
          <div className="p-5">
            {itemsList?.length > 0 ? (
              <>
                {/* Table Header */}
                <div className="grid grid-cols-12 text-center font-bold border-b border-gray-300 pb-3 px-4">
                  <div className="hidden sm:block text-start col-span-1">ID</div>
                  <div className="text-start col-span-2">Name</div>
                  <div className="text-start col-span-2">Image</div>
                  <div className="text-start col-span-2">Position</div>
                  <div className="text-start col-span-2">Job</div>
                  <div className="text-start col-span-1">Type</div>
                 
                  <div className="hidden sm:block text-end col-span-1">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y">
                  {itemsList?.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-12 items-center text-center py-3 px-4">
                      <div className="hidden sm:block text-start col-span-1">{item.id}</div>
                      <div className="text-start col-span-2 font-bold">{item.name}</div>

                      <div className="col-span-2">
                        <img
                          className="w-[70px] sm:w-[110px] md:w-[140px] lg:w-[160px] mx-auto rounded-md shadow-md"
                          src={`${process.env.GATSBY_API_URL}${item.image}`}
                          alt=""
                        />
                      </div>

                      <div className="text-start col-span-2 font-semibold">
                        {item.type === "AMCP" ? "--" : item.position_en || item.position_fr}
                      </div>

                      <div className="text-start col-span-2 font-semibold">{item.job_en || item.job_fr}</div>
                      <div className="text-start col-span-1">{item.type}</div>

                  

                      <div className="col-span-1 flex justify-end sm:justify-center gap-2">
                        <Link className="text-center" to={`/admin/team-members/${item.slug}`}>
                          <PencilSquareIcon className="h-7 w-7 text-blue-600 hover:text-blue-800 transition" />
                        </Link>

                        <button type="button" onClick={(e) => deleteItem(e, item)}>
                          <TrashIcon className="h-7 w-7 text-red-600 hover:text-red-800 transition" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
                <InboxIcon className="block h-20 w-20 text-gray-400" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-500">There are no members</h3>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

import { InboxIcon, PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { Link } from "gatsby";
import "./species.css"
import EditIsPopularModal from "./EditIsPopularModal";

export default function Species() {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  function getSpecies() {
    axios
      .get("/api/species")
      .then((res) => {

        setItemsList(res.data);

        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  }
    useEffect(() => {
      getSpecies();
      return;
    }, []);

  const deleteItem = (e: any, item: any) => {
    e.preventDefault();

    Swal.fire({
      title: "Delete Species",
      text: `Are you sure to delete ${item.title_en || item.title_fr} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/species/${item.id}`)
          .then((res) => {
            Swal.fire("Success", res.data.message, "success");
            getSpecies();
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

  const handleToggle = (item) => {
    if (item.type !== "marin") {
      Swal.fire("Error", "Only 'marin' species can be updated.", "error");
      return;
    }
  
    const updatedStatus = item.is_popular === "yes" ? "no" : "yes";
    const popularCount = itemsList.filter(itm => itm.is_popular === "yes").length;
  
    if (updatedStatus === "yes" && popularCount >= 6) {
      Swal.fire("Limit Reached", "You can only have a maximum of 6 popular species.", "warning");
      return;
    }
  
    if (updatedStatus === "yes") {
      Swal.fire({
        title: "Update Species Information",
        html: `
          <div class="swal2-form">
            <div class="swal2-input-group">
              <label for="description_en"><strong>Description (EN):</strong></label>
              <textarea id="description_en" class="swal2-textarea" required>${item.description_en ? item.description_en : ""}</textarea>
            </div>
            <div class="swal2-input-group">
              <label for="description_fr"><strong>Description (FR):</strong></label>
              <textarea id="description_fr" class="swal2-textarea" required>${item.description_fr ? item.description_fr : ""}</textarea>
            </div>
            <div class="swal2-input-group">
              <label for="ecological_importance_en"><strong>Ecological Importance (EN):</strong></label>
              <textarea id="ecological_importance_en" class="swal2-textarea" required>${item.ecological_importance_en ? item.ecological_importance_en : ""}</textarea>
            </div>
            <div class="swal2-input-group">
              <label for="ecological_importance_fr"><strong>Ecological Importance (FR):</strong></label>
              <textarea id="ecological_importance_fr" class="swal2-textarea" required>${item.ecological_importance_fr ? item.ecological_importance_fr : ""}</textarea>
            </div>
          </div>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        width: "800px",
        padding: "2em",
        backdrop: true,
        focusConfirm: false,
        preConfirm: () => {
          // Get the values from the textareas
          const descriptionEn = document.getElementById("description_en").value.trim();
          const descriptionFr = document.getElementById("description_fr").value.trim();
          const ecologicalImportanceEn = document.getElementById("ecological_importance_en").value.trim();
          const ecologicalImportanceFr = document.getElementById("ecological_importance_fr").value.trim();
    
          // Validate required fields
          if (!descriptionEn || !descriptionFr || !ecologicalImportanceEn || !ecologicalImportanceFr) {
            Swal.showValidationMessage("All fields are required");
            return false; // Prevent the modal from closing
          }
    
          // Return the updated data if validation passes
          return {
            description_en: descriptionEn,
            description_fr: descriptionFr,
            ecological_importance_en: ecologicalImportanceEn,
            ecological_importance_fr: ecologicalImportanceFr,
          };
        },
        customClass: {
          container: "swal2-custom-container",
          popup: "swal2-custom-popup",
          header: "swal2-custom-header",
          title: "swal2-custom-title",
          content: "swal2-custom-content",
          input: "swal2-custom-input",
          actions: "swal2-custom-actions",
          confirmButton: "swal2-custom-confirm-button",
          cancelButton: "swal2-custom-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          updateIsPopular(item, updatedStatus, result.value);
        }
      });
    } else {
      updateIsPopular(item, updatedStatus);
    }
  };
  
  // Function to handle the actual update
  const updateIsPopular = (item, updatedStatus, updatedFields = {}) => {
    // Optimistic UI Update
    setItemsList(prevItems =>
      prevItems.map(itm =>
        itm.id === item.id
          ? { ...itm, is_popular: updatedStatus, ...updatedFields }
          : itm
      )
    );
  
    // Send update request to backend
    axios
      .put(`/api/species/is-popular/${item.slug}`, {
        is_popular: updatedStatus,
        ...updatedFields,
      })
      .then((res) => {
        Swal.fire("Success", res.data.message, "success");
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
  
        // Revert change if request fails
        setItemsList(prevItems =>
          prevItems.map(itm =>
            itm.id === item.id ? { ...itm, is_popular: item.is_popular } : itm
          )
        );
      });
  };
  
  


  return (
    <>
      <div className="max-w-[80rem] p-2 sm:p-5 mx-auto">
        <div className="rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg">
            <h5 className="mb-3">Species ( {itemsList.length} )</h5>
            <Link to="/admin/species/create" className="bg-blue-600 text-white p-2 rounded">
              Create Species
            </Link>
          </div>
          <div className="p-5">
            {itemsList?.length > 0 ? (
              <>
                <div className="mx-0 grid grid-cols-12 text-center break-all">

                  <div className="pb-3 text-start col-span-2">Image</div>
                  <div className="pb-3 text-start col-span-2 sm:col-span-2">Title</div>
                  <div className="pb-3 text-start col-span-2">Type</div>
                  <div className="pb-3 col-span-2">Status</div>
                  <div className="pb-3 col-span-2">is_popular</div>
                  <div className="pb-3 hidden sm:block text-end sm:text-center col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {itemsList?.map((item: any) => {
                    return (
                      <div key={item.id} className="mx-0 grid grid-cols-12 text-center break-all">

                        <div className="pt-3 col-span-2">
                          <img className="w-[70px] sm:w-[130px] md:w-[160px]" src={`${process.env.GATSBY_API_URL}${item.image}`} alt="" />
                        </div>
                        <div className="pt-3 text-start col-span-2 sm:col-span-2">
                          <div className="font-bold">{item.title_en || item.title_fr}</div>{" "}
                        </div>
                        <div className="pt-3 col-span-2 text-start">{item.type}</div>
                        <div className="pt-3 col-span-2">{item.status == 1 ? "active" : "hidden"}</div>
                        <div className="pt-3 col-span-2">

                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              name="is_popular"
                              checked={item.is_popular === "yes"}
                              onChange={() => handleToggle(item)}
                            />
                            <span className="slider"></span>
                          </label>


                        </div>
                        <div className="pt-3 text-end sm:text-center col-span-1 sm:col-span-2">
                          <div className="grid grid-cols-12">
                            <div className="col-span-12 sm:col-span-6 flex justify-end sm:justify-center">
                              <Link className="text-center" to={`/admin/species/manage-species/${item.slug}`}>
                                <MagnifyingGlassIcon className="block h-8 w-8 text-blue-600" aria-hidden="true" />
                              </Link>

                              <Link className="text-center" to={`/admin/species/${item.slug}`}>
                                <PencilSquareIcon className="block h-8 w-8 text-blue-600" aria-hidden="true" />
                              </Link>
                            </div>
                            <div className="col-span-12 sm:col-span-6 flex justify-end sm:justify-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  deleteItem(e, item);
                                }}
                              >
                                <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center text-center h-[25vh]">
                <InboxIcon className="block h-20 w-20" aria-hidden="true" />
                <h3 className="text-2xl font-bold">Theres no species</h3>
              </div>
            )}
          </div>
        </div>
  
      </div>
    </>
  );
}

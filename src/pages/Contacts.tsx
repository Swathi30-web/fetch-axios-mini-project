import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import type { Contact } from "../types/Employee";

const emptyForm = {
  name: "",
  phone: "",
  role: "",
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);

  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  // GET /contacts
  const fetchContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get<Contact[]>("/contacts");
      setContacts(res.data);
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.message
          : "Failed to load contacts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // POST /contacts
  const handleAdd = async () => {
    if (!addForm.name.trim() || !addForm.phone.trim()) {
      alert("Name and Phone are required.");
      return;
    }

    try {
      const res = await api.post<Contact>("/contacts", addForm);

      setContacts((prev) => [...prev, res.data]);

      setAddForm(emptyForm);
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      alert("Could not add contact. Please try again.");
    }
  };

  // Start Edit
  const startEdit = (contact: Contact) => {
    setEditId(contact.id);

    setEditForm({
      name: contact.name,
      phone: contact.phone,
      role: contact.role,
    });
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);
    setEditForm(emptyForm);
  };

  // PUT /contacts/:id
  const handleUpdate = async (id: string) => {
    if (!editForm.name.trim() || !editForm.phone.trim()) {
      alert("Name and Phone are required.");
      return;
    }

    try {
      const res = await api.put<Contact>(
        `/contacts/${id}`,
        {
          id,
          ...editForm,
        }
      );

      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === id ? res.data : contact
        )
      );

      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Could not update contact. Please try again.");
    }
  };

  // DELETE /contacts/:id
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact?")) {
      return;
    }

    try {
      await api.delete(`/contacts/${id}`);

      setContacts((prev) =>
        prev.filter((contact) => contact.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Could not delete contact. Please try again.");
    }
  };

  // Search
  const filtered = contacts.filter((contact) =>
    contact.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">

      {/* Header */}
      <div className="contacts-header">
        <div>
          <h2>Contacts</h2>

          <p className="page-sub">
         
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setShowAdd((prev) => !prev);
            setAddForm(emptyForm);
          }}
        >
          + Add
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading */}
      {loading && (
        <p className="loading">
          Loading contacts...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* Add Form */}
      {showAdd && (
        <div className="inline-form">
          <h4>Add Contact</h4>

          <div className="form-row">

            <input
              type="text"
              placeholder="Name"
              value={addForm.name}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              value={addForm.phone}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Role"
              value={addForm.role}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  role: e.target.value,
                })
              }
            />

            <button
              className="ghost-btn"
              onClick={() => {
                setShowAdd(false);
                setAddForm(emptyForm);
              }}
            >
              Cancel
            </button>

            <button
              className="primary-btn"
              onClick={handleAdd}
            >
              Add Contact
            </button>

          </div>
        </div>
      )}

      {/* Contacts Table */}
      {!loading && (
        <table className="contacts-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((contact, index) =>

              editId === contact.id ? (

                /* Edit Row */
                <tr
                  key={contact.id}
                  className="editing-row"
                >
                  <td colSpan={5}>

                    <div className="inline-form">

                      <h4>Edit Contact</h4>

                      <div className="form-row">

                        <input
                          type="text"
                          placeholder="Name"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              name: e.target.value,
                            })
                          }
                        />

                        <input
                          type="text"
                          placeholder="Phone"
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              phone: e.target.value,
                            })
                          }
                        />

                        <input
                          type="text"
                          placeholder="Role"
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              role: e.target.value,
                            })
                          }
                        />

                        <button
                          className="ghost-btn"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>

                        <button
                          className="primary-btn"
                          onClick={() =>
                            handleUpdate(contact.id)
                          }
                        >
                          Update Contact
                        </button>

                      </div>

                    </div>

                  </td>
                </tr>

              ) : (

                /* Normal Row */
                <tr key={contact.id}>

                  {/* Display ID */}
                  <td>{index + 1}</td>

                  <td>{contact.name}</td>

                  <td>{contact.phone}</td>

                  <td>{contact.role || "-"}</td>

                  <td className="actions">

                    <button
                      className="link-btn"
                      onClick={() => startEdit(contact)}
                    >
                      Edit
                    </button>

                    <button
                      className="link-btn danger"
                      onClick={() =>
                        handleDelete(contact.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

            {/* No Results */}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="no-results"
                >
                  No contacts match your search.
                </td>
              </tr>
            )}

          </tbody>

        </table>
      )}

    </div>
  );
}
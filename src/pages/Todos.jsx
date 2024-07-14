// custom hooks
import { useCollection } from "../hooks/useCollection";

// import rrd
import { useActionData, Form } from "react-router-dom";

//componenet
import { FormInput } from "../components";
import { useEffect, useState } from "react";

// firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../hooks/useGlobalContext";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();

  let title = formData.get("title");

  return { title };
};

function Todos() {
  const { user } = useGlobalContext();
  const { data } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt"]
  );
  const dataTodo = useActionData();

  const [inputValue, setInputValue] = useState("");

  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");

  const handleDelete = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then(() => {
        toast.success("Ёзувингиз муваффақиятли ўчирилди!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleComleted = (id, status) => {
    const todoRef = doc(db, "todos", id);

    updateDoc(todoRef, {
      comleted: !status,
    })
      .then(() => {
        toast.success("Ёзувингиз муваффақиятли ўзгартирилди!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEdit = (id) => {
    const todoRef = doc(db, "todos", id);

    updateDoc(todoRef, {
      title: editText,
    })
      .then(() => {
        toast.success("Ёзувингиз муваффақиятли ўзгартирилди!");
        setEditMode(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    if (dataTodo) {
      const newTodod = {
        ...dataTodo,
        comleted: true,
        createdAt: serverTimestamp(),
        uid: user.uid,
      };

      addDoc(collection(db, "todos"), newTodod)
        .then(() => {
          toast.success("Ёзувингиз базага муваффақиятли қўшилди!");
          setInputValue("");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [dataTodo]);
  return (
    <div className="align-elements mt-10">
      {data &&
        data.map((todo) => (
          <div
            className={`${
              todo.comleted ? "opacity-30" : "opacity-100"
            } flex flex-col gap-3`}
            key={todo.id}
          >
            <div
              key={todo.id}
              className="flex justify-between items-center mt-3 "
            >
              {editMode == todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-3xl">{todo.title}</p>
              )}
              {/* <p className="text-3xl">{todo.title}</p> */}
              <div className="flex items-center gap-3">
                {editMode === todo.id ? (
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className="btn btn-outline btn-success"
                  >
                    Сақлаш!
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditMode(todo.id);
                      setEditText(todo.title);
                    }}
                    className="btn btn-outline btn-warning"
                  >
                    Ўзгартириш!
                  </button>
                )}
                <button
                  onClick={() => handleComleted(todo.id, todo.comleted)}
                  className="btn btn-outline btn-accent"
                >
                  Бажарилди!
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-outline btn-secondary"
                >
                  Ўчириш!
                </button>
              </div>
            </div>
          </div>
        ))}
      <div>
        <Form method="post" className="flex items-center">
          <FormInput
            name="title"
            label="Title"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-outline btn-primary mt-5 ml-80">
            Қўшиш!
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Todos;

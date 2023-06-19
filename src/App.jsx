import { useState } from "react";
import Student from "./components/Student";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { MdZoomInMap } from "react-icons/md";
import {BiEditAlt} from "react-icons/bi"

export default function App() {
  const [index, setIndex] = useState(0);
  const [newShoes, setNewShoes] = useState(0);
  const [newStudent, setNewStudent] = useState("");
  const [newCollage, setNewCollage] = useState({
    id: null,
    name: "",
    sizeShoes: null,
  });
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Dimas Firmansyah",
      sizeShoes: 43,
    },
    {
      id: 2,
      name: "Wahyu",
      sizeShoes: 41,
    },
    {
      id: 3,
      name: "Tigana Reymansyah",
      sizeShoes: 44,
    },
  ]);

  let nextId = students.length + 1;

  return (
    <main>
      {/* Tampil */}

      <div>
        {students.map((value, index) => {
          return (
            <Student
              key={index}
              indeks={value.id}
              nama={value.name}
              ukuranSepatu={value.sizeShoes}
            />
          );
        })}
      </div>

      {/* Input */}

      <div className="card">
        <form className="card">
          <h1>Tambah Data</h1>
          <label>
            Nama :
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
            />
          </label>
          <label>
            Ukuran Sepatu :
            <input
              type="number"
              value={newShoes}
              onChange={(e) => setNewShoes(e.target.value)}
            />
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setStudents([
                ...students,
                {
                  id: nextId,
                  name: newStudent,
                  sizeShoes: newShoes,
                },
              ]);
            }}
          >
            <FaPlus size={15} className="icons" />
            Tambah Depan
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setStudents([
                {
                  id: nextId,
                  name: newStudent,
                  sizeShoes: newShoes,
                },
                ...students,
              ]);
            }}
          >
            <FaPlus size={15} className="icons" />
            Tambah Belakang
          </button>
        </form>
      </div>

      {/* Edit  */}

      <form className="card">
        <h1>Edit Data</h1>
        <label>
          ID :
          <input
            type="number"
            value={newCollage.id}
            onChange={(e) =>
              setNewCollage({ ...newCollage, id: parseInt(e.target.value) })
            }
          />
        </label>
        <label>
          Nama :
          <input
            type="text"
            value={newCollage.name}
            onChange={(e) => setNewCollage({...newCollage, name: e.target.value})}
          />
        </label>
        <label className="style1">
          Ukuran Sepatu :
          <button
            onClick={(e) => {
              e.preventDefault();
              students.map((student) => {
                if (student.id === newCollage.id) {
                  student.sizeShoes = student.sizeShoes + 1;
                  setStudents([...students]);
                }
              });
            }}
          >
            <MdZoomOutMap size={12} /> Perbesar
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              students.map((student) => {
                if (student.id === newCollage.id) {
                  student.sizeShoes = student.sizeShoes - 1;
                  setStudents([...students]);
                }
              });
            }}
          >
            <MdZoomInMap size={12} />
            Perkecil
          </button>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            setStudents(
              students.filter((student) => student.id !== parseInt(index))
            );
          }}
        >
          <BsFillTrash3Fill className="icons" />
          Hapus Berdasarkan ID
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            const editStudent = students.map((student) => student.id === newCollage.id ? {...student, name: newCollage.name} : student)
            setStudents(editStudent)
          }}
        >
          <BiEditAlt className="icons" />
          Edit Data
        </button>
      </form>

      {/* Hapus  */}
      <div className="card">
        <h1>Hapus Data</h1>
        <div className="style1">
          <button
            onClick={() => {
              setStudents(students.slice(1));
            }}
          >
            <BsFillTrash3Fill className="icons" />
            Depan
          </button>
          <button
            onClick={() => {
              setStudents(students.slice(0, -1));
            }}
          >
            <BsFillTrash3Fill className="icons" />
            Belakang
          </button>
        </div>
        <button
          className="btnHapus"
          onClick={() => {
            setStudents(students.slice(students.length, 0));
          }}
        >
          <BsFillTrash3Fill className="icons" />
          Semua
        </button>
      </div>
    </main>
  );
}

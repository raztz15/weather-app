import { ForecastPage } from "./components/forecast/ForecastPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FavoriteCities } from "./components/favorite-cities/FavoriteCities";
import { AppBar } from "@mui/material";
import { Navbar } from "./components/navbar/Navbar";
import { isArray } from "util";



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={"/forecast"} />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/favorite-cities" element={<FavoriteCities />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

const students = [
  { name: 'Alice', age: 17, scores: [85, 90, 88], passed: true },
  { name: 'Bob', age: 20, scores: [70, 65, 72], passed: false },
  { name: 'Charlie', age: 18, scores: [95, 100, 98], passed: true },
  { name: 'Dave', age: 21, scores: [45, 50, 40], passed: false },
  { name: 'Eve', age: 19, scores: [78, 82, 80], passed: true }
];

// Type for a student object
type Student = {
  name: string;
  age: number;
  scores: number[];
  passed: boolean;
};

// Type for a grouped students object
type GroupedStudents = {
  passed: Student[];
  failed: Student[];
};

type AveScore = {
  name: string, aveScore: number
}

function displayStudents(students: Student[]) {
  const filteredStudents = students.filter(student => student.age >= 18)
  const studentsAve: AveScore[] = []
  const studentsAveScore = filteredStudents.map(student => {
    let aveScore = 0

    student.scores.forEach(score => {
      aveScore = aveScore += score / student.scores.length
    })
    studentsAve.push({ name: student.name, aveScore })
    return studentsAve
  })

  const hasAveUnderSixty = studentsAve.some(student => student.aveScore < 60)
  let hasAveAbove89: boolean | undefined
  studentsAve.forEach(student => {
    if (student.aveScore >= 90) hasAveAbove89 = true
  })
  console.log(`There is ${hasAveAbove89 ? 'at least one' : 'NO'} student with score average of at least 90`);

  console.log(hasAveUnderSixty ? "Not all students have the required average" : "All students have required average")
  const totalSumStusentsAve = studentsAve.reduce((totalAve, student) => totalAve += student.aveScore, 0)
  console.log('Total studentsaverage score is: ', totalSumStusentsAve);

  const groupedByPassesStudent = students.reduce((studentEndResult: GroupedStudents, student) => {
    if (student.passed) {
      studentEndResult.passed.push(student)
    } else {
      studentEndResult.failed.push(student)
    }
    return studentEndResult
  }, { passed: [], failed: [] })

  console.log(groupedByPassesStudent);


}

displayStudents(students)
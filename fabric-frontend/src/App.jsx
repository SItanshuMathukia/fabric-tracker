import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CreateBatch from "./components/CreateBatch";
import AddTransaction from "./components/AddTransaction";
import Ledger from "./components/Ledger";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Fabric Tracker 🧵
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <CreateBatch />
        <AddTransaction />
        <Ledger />
      </div>
    </div>
  );
}

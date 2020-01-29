import React from 'react'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import ItemList from './components/ItemList'

function App() {
  return (
    <div className="app">
      <Header />
      <h1>Movie search app</h1>
      <div className="content-side">
        <Search />
        <ItemList />
      </div>
      <div className="content-main"></div>
      <Footer />
    </div>
  )
}

export default App

import "./App.css";
import QuoteDisplay from "./QuoteDisplay";
import { useState, useEffect } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuote, setCurrentQuote] = useState({
    quoteText: "",
    quoteAuthor: "",
  });
  const [filteredAuthor, setFilteredAtuhor] = useState("");
  const [savedQoutes, setSavedQoutes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      
      try {
        setLoading(true);
        const response = await fetch("https://type.fit/api/quotes");
        if (!response.ok) {
          throw new Error("Error encountered. Please try again");
        }
        const json = await response.json();
        setQuotes(json);
        setLoading(false);
      } catch (error) {}
    };

    fetchQuotes();
  }, [filteredAuthor]); // [] Dependency Array

  const getRandomQuote = () => {
    //Use filter inorder to filter all the names 
    const filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(filteredAuthor.toLocaleLowerCase()))
    setSavedQoutes(filteredQuotes)
    console.log("filtered author qoutes", filteredQuotes);

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Filtered by Author"
        value={filteredAuthor}
        onChange={(e) => setFilteredAtuhor(e.target.value)}
      ></input>
      {/* if array is empty, render the saved qoutes */}
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
    
      {
        (savedQoutes.length > 0) && savedQoutes.map((savedQuote, index) => (
          <div key={index} style={{ border: '1px solid black', width: 250 }}>
            <QuoteDisplay quoteText={savedQuote.text} quoteAuthor={savedQuote.author} />
          </div>
        ))
      }</div>
      
      <button onClick={getRandomQuote}> Show Random Quote </button>
    </div>
  );
}

export default App;

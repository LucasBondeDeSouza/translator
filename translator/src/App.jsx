import React, { useState, useEffect } from "react";
import Header from './components/Header'
import Footer from "./components/Footer";
import Error from "./components/Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const [sourceLang, setSourceLang] = useState('pt')
  const [targetLang, setTargetLang] = useState('en')
  const [sourceText, setSourceText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate()
      }, 500)

      return () => clearTimeout(delay)
    }
  }, [sourceText, targetLang, sourceLang])

  const handleTranslate = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`)
      const data = await response.json()
      setTranslatedText(data.responseData.translatedText)
    } catch(err) {
      setError(`Erro ao tentar traduzir: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const swapTranslate = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const languages = [
    { code: 'en', name: 'Inglês' },
    { code: 'es', name: 'Espanhol' },
    { code: 'fr', name: 'Francês' },
    { code: 'de', name: 'Alemão' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Header />

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select 
              value={sourceLang}
              onChange={e => setSourceLang(e.target.value)}
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"  
            >
              { languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button className="p-2 rounded-full hover:bg-gray-100 outline-none" onClick={swapTranslate}>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-headerColor" />
            </button>

            <select 
              value={targetLang}
              onChange={e => setTargetLang(e.target.value)}
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
            >
              { languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea 
                value={sourceText}
                onChange={e => setSourceText(e.target.value)}
                placeholder="Digite seu texto..." 
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
              ></textarea>
            </div>

            <div className="p-4 relative bg-secondaryBackground border-l border-gray-200">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">               
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div> 
                </div>
              ) : (
                <p className="text-lg text-textColor">{translatedText}</p>
              )}
            </div>
          </div>

          <Error error={error} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
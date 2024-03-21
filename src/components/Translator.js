import React, { useState } from "react";
import { selectOptions } from "./languageData";
import { FaCopy } from "react-icons/fa";
import axios from "axios";

const Translator = () => {
  const [textInput, setTextInput] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("mr");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const apiKey = "b87acf167dmshe61573f5ff92cc9p1219c8jsn0d95b571164e";
    const headers = {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      "content-type": "application/x-www-form-urlencoded",
    };
    const data = {
      source_language: sourceLang,
      target_language: targetLang,
      text: textInput,
    };

    try {
      let response = await axios.post(url, data, { headers });
      const result = response.data;
      if (result.status === "success") {
        let translatedText = result.data.translatedText;
        setResultText(translatedText);
      } else {
        alert("Error in translation!");
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred while translating", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSourceLangChange = (e) => {
    setSourceLang(e.target.value);
  };

  const handleTargetLangChange = (e) => {
    setTargetLang(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleCopyTranslatedText = () => {
    navigator.clipboard.writeText(resultText);
    alert("Text Copied!");
  };

  return (
    <>
      <h1 className="text-4xl text-gray-500 my-8 underline text-center ">
        Translator App
      </h1>
      <div className="w-full max-w-2xl mx-auto p-4 bg-gray-300 rounded-lg shadow-lg mt-16">
        <div className="grid grid-cols-1 gap-4">
          <div className="">
            <select
              id="source"
              name="source"
              onChange={handleSourceLangChange}
              value={sourceLang}
              className="rounded-full text-white bg-green-500 text-center py-3 px-1"
            >
              {Object.entries(selectOptions).map(
                ([languageName, languageCode]) => (
                  <option key={languageCode} value={languageCode}>
                    {languageName}
                  </option>
                )
              )}
            </select>
          </div>
          <textarea
            id="text"
            className="w-full h-32 px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={textInput}
            placeholder="Enter Text Here..."
            onChange={handleTextChange}
          ></textarea>
          <div>
            <select
              id="target"
              name="target"
              onChange={handleTargetLangChange}
              value={targetLang}
              className="rounded-full text-white bg-red-500 text-center py-3"
            >
              {Object.entries(selectOptions).map(
                ([languageName, languageCode]) => (
                  <option key={languageCode} value={languageCode}>
                    {languageName}
                  </option>
                )
              )}
            </select>

            <button
              className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 "
              onClick={handleTranslate}
              disabled={loading}
            >
              {loading ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-full flex-col  justify-center items-center">
          <p className="text-center mt-8 ">{resultText}</p>
          <FaCopy
            className="text-center text-blue-500 m-4 text-2xl cursor-pointer"
            onClick={handleCopyTranslatedText}
          />
        </div>
      </div>
    </>
  );
};

export default Translator;
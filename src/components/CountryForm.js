import { useState } from "react"
const defaultValue = {
  "nameFr": "",
  "nameEn": "",
  "nameAr": "",
  "isoCode": "",
  "topCountry": true
}

const CountryForm = ({ onSubmit, updateCountry = null }) => {
  const [country, setCountry] = useState(updateCountry ?? defaultValue)

  const handleOnChange = (e) => {
    setCountry({
      ...country,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    onSubmit(country);
    setCountry(defaultValue);
  }

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameFr">
          nameFr
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nameFr"
          name='nameFr'
          type="text"
          placeholder="nameFr"
          value={country.nameFr}
          onChange={handleOnChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameEn">
          nameEn
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nameEn"
          name='nameEn'
          type="text"
          placeholder="nameEn"
          value={country.nameEn}
          onChange={handleOnChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameAr">
          nameAr
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nameAr"
          name='nameAr'
          type="text"
          placeholder="nameAr"
          value={country.nameAr}
          onChange={handleOnChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isoCode">
          isoCode
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="isoCode"
          name='isoCode'
          type="text"
          placeholder="isoCode"
          value={country.isoCode}
          onChange={handleOnChange}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSubmit}
      >
        Save
      </button>
    </form>
  )
}

export default CountryForm
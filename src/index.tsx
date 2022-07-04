import React from 'react'
import ReactDOM from 'react-dom/client'
import ParamEditor from './App'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const params = [
  {
    id: 1,
    name: "Назначение",
    type: "string"
  },
  {
    id: 2,
    name: "Длина",
    type: "string"
  },
  {
    id: 3,
    name: "Сфера применения",
    type: "string"
  }
]


const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное"
    },
    {
      paramId: 2,
      value: "максимальная"
    },
    {
      paramId: 3,
      value: "IT"
    }
  ]
}


root.render(<ParamEditor model={model} params={params} />)
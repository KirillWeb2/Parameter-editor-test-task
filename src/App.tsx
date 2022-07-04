
import React from "react"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, TextField, Typography } from "@mui/material"

interface Param {
  id: number
  name: string
  type: string
}
interface ParamValue {
  paramId: number
  value: string
}
interface Model {
  paramValues: ParamValue[]
  colors?: String[]
}
interface State {
  params: Param[]
  values: ParamValue[]
  isNew: boolean
  name: string
  value: string
  changeItemId: number
}
interface Props {
  params: Param[]
  model: Model
}


class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      params: this.props.params,
      values: this.props.model.paramValues,
      isNew: false,
      name: "",
      value: "",
      changeItemId: 0
    }

    this.changeParams = this.changeParams.bind(this)
    this.openForm = this.openForm.bind(this)
    this.changeForm = this.changeForm.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.deleteParams = this.deleteParams.bind(this)
  }

  openForm(): void {
    this.setState({ isNew: true })
  }

  changeValue(parameter: Param, value: ParamValue): void {
    this.setState({
      isNew: true,

      value: value.value,
      name: parameter.name,

      changeItemId: parameter.id
    })
  }

  changeForm(e: React.ChangeEvent<HTMLInputElement>): void {
    switch (e.target.name) {
      case "name": this.setState({ name: e.currentTarget.value })
        break
      case "value": this.setState({ value: e.currentTarget.value })
        break
      default: return
    }
  }

  deleteParams(id: number): void {
    this.setState({
      params: this.state.params.filter(i => i.id !== id),
      values: this.state.values.filter(i => i.paramId !== id)
    })
  }

  changeParams(): void {
    if (!this.state.name || !this.state.value) {
      return this.setState({ isNew: false, value: '', name: '' })
    }

    const newParams: Param = {
      id: this.state.params.length + 1,
      name: this.state.name,
      type: "string"
    }

    const newValue: ParamValue = {
      paramId: newParams.id,
      value: this.state.value
    }

    if (this.state.changeItemId) {
      // this.state.changeItemId параметр позволяющий определить, какой параметр изменить
      // если этот параметр есть, значит обновляем, если нет - добавляем параметр

      this.setState({
        params: this.state.params.map(i => i.id === this.state.changeItemId
          ? { ...i, name: this.state.name }
          : i
        ),
        values: this.state.values.map(i => i.paramId === this.state.changeItemId
          ? { ...i, value: this.state.value }
          : i
        ),

        value: "",
        name: "",

        isNew: false,
        changeItemId: 0
      })
    } else {
      this.setState({
        params: [...this.state.params, newParams],
        values: [...this.state.values, newValue],

        value: "",
        name: "",

        isNew: false,
        changeItemId: 0
      })
    }
  }


  render(): React.ReactNode {
    return (
      <Box className="app">
        <Typography variant="h1" component="div">
          Parameter editor
        </Typography>
        <Box className="params">
          {this.state.params.map(i =>
            <Box key={i.id} className="params__item">
              <Typography className="params__item_left" variant="body1" component="div">
                {i.name}
              </Typography>
              <TextField
                id="standard-basic"
                className="params__item_middle"
                label={i.name}
                variant="standard"
                value={this.state.values[i.id - 1].value}
              />
              <Box className="params__item_right">
                <EditIcon className="change" onClick={() => this.changeValue(i, this.state.values[i.id - 1])} />
                <DeleteIcon className="delete" onClick={() => this.deleteParams(i.id)} />
              </Box>
            </Box>
          )}
          {this.state.isNew &&
            <Box className="item__change">
              <TextField
                id="standard-basic"
                label='Название параметра'
                className="item__change_left"
                name="name"
                variant="standard"
                value={this.state.name}
                onChange={this.changeForm}
              />
              <TextField
                id="standard-basic"
                label="Значение"
                className="item__change_right"
                name="value"
                variant="standard"
                value={this.state.value}
                onChange={this.changeForm}
              />
            </Box>
          }
          {this.state.isNew && <Button onClick={this.changeParams} variant="outlined">Готово</Button>}
          {!this.state.isNew && <Button onClick={this.openForm} variant="outlined">Добавить параметр</Button>}
        </Box>

      </Box>
    )
  }
}

export default ParamEditor

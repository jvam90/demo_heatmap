import { useEffect, useRef, useState } from "react"
import h337 from "heatmap.js"
import axios from "axios"

export default function App() {
  const ref = useRef()
  const [heatmap, setHeatmap] = useState(null)

  useEffect(() => {
    const hm = h337.create({
      container: ref.current,
      radius: 40
    })
    setHeatmap(hm)
    load(hm)
  }, [])

  const load = async hm => {
    const res = await axios.get("https://backend:3001/points")
    hm.setData({ max: 5, data: res.data })
  }

  const click = async e => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    await axios.post("https://backend:3001/points", { x, y })
    load(heatmap)
  }

  return (
    <div>
      <h2>Heatmap SaaS</h2>
      <div
        ref={ref}
        onClick={click}
        style={{ width: 800, height: 500, border: "1px solid black" }}
      />
    </div>
  )
}

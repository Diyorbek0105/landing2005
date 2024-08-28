import React, { useEffect, useState } from 'react'
import '../style/projects.css'
import { URL } from '../uilst/url'


function Projects() {
  const [project, setProject] = useState(null)
  const [pro, setPro] = useState(null)
  useEffect(() => {
    getProject()
    getProCard()
  }, [])
  async function getProject() {
    let fetchProject = await fetch(`${URL}/all-projects`)
    let json = await fetchProject.json()
    setProject(json.data[0])
  }
  async function getProCard() {
    let fetchProCard = await fetch(`${URL}/projects`)
    let json = await fetchProCard.json()
    setPro(json.data)
  }
  return (
    <section className='projects'>
      <div className="container">
        <div className="projects_list">
          <h4>{project?.title}</h4>
          <p>{project?.description}</p>
        </div>
        <div className="projects_grid">
          {pro?.map((item) => {
            return (
              <div className="ProCard" key={item?._id}>
                <img src={item?.imageLink} alt="" />
              </div>
            )
          })}
        </div>
        <button className='button'>Все проекты</button>
      </div>
    </section>
  )
}

export default Projects

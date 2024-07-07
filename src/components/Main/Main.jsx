import './styles.css'

function Main({children}) {
  return (
    <div className='container'>
        <div className="content">
            {children}
        </div>
    </div>
  )
}

export default Main
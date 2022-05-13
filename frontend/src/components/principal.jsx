import './styles/principal.css'
import Side_panel from "./side_panel"

const Principal = ({children}) => {
    return(
      <div id='principal_page'>
        <Side_panel/>
        <section>
          {children}
        </section>
      </div>
    )
}
export default Principal
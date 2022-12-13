import Image from './Image'
import { useNavigate } from 'react-router-dom'

export default function ImageControl({ first, finish, ind, imgObj, changeRating }) {
    const navigateH = useNavigate()

    function navigate(n) {
        return () => {
            navigateH('/' + (ind + n))
        }
    }

    return <div className='box'>
        <Image obj={imgObj} changeRating={changeRating} />
        {!first ? <button onClick={navigate(-1)}>{"<"}</button> : ""}
        {!finish ? <button onClick={navigate(1)}>{">"}</button> : ""}
    </div>
}
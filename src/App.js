import { useState, useRef } from 'react';
import './App.css';
import './styles/instagram.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';
import { saveAs } from 'file-saver'
import Button from 'react-bootstrap/Button';
import { toJpeg } from 'html-to-image';

// import instagram from './images/instagram.jpg';
const filters = ['1977', 'aden', 'amaro', 'ashby', 'brannan', 'brooklyn', 'charmes', 'clarendon', 'crema'
  , 'dogpatch', 'earlybird', 'gingham', 'ginza', 'hefe', 'helena', 'hudson', 'inkwell', 'kelvin', 'juno', 'lark',
  'lofi', 'ludwig', 'maven', 'mayfair', 'moon', 'nashville', 'perpetua', 'poprocket', 'reyes', 'rise', 'sierra',
  'skyline', 'slumber', 'stinson', 'sutro', 'toaster', 'valencia', 'vesper', 'walden', 'willow', 'xpro-ii']
function App() {
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Select Filter')
  const elementRef = useRef(null);
  const htmlToImageConvert = () => {
    toJpeg(elementRef.current, { quality: 0.99 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className='col-md-2'>
          <input type="file" onChange={uploadImage} />
          <br />
        </div>
      </div>
      <hr />
      {
        imageFile &&
        <div className='row'>
          <div className='col-md-2'>
            <DropdownButton id="dropdown-basic-button" title={selectedFilter} onSelect={function (evt) { changeFilter(evt) }} >
              {
                filters.map(filter => <Dropdown.Item eventKey={filter}>{filter}</Dropdown.Item>)
              }
            </DropdownButton>
          </div>
          <div className='col-md-2'>
            <Button onClick={htmlToImageConvert}>Download!</Button>
          </div>
        </div>
      }

      {image && selectedFilter &&
        <div className='row' ref={elementRef}>
          <div className='col-md-12'>
            <figure className={`filter-${selectedFilter}`}>
              <Image src={image} fluid />
            </figure>
          </div>
        </div>
      }
    </div>
  );
  function uploadImage(event) {
    setImageFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  }
  function changeFilter(event) {
    setSelectedFilter(event)
  }
  function downloadImage() {
    saveAs(image, 'image.jpg');
  }
}

export default App;

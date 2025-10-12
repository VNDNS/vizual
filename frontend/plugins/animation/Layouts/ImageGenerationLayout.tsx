
import { FileDisplay } from '../../common/components/FileDisplay';
import { useSetCurrentPlugin } from '../../common/hooks/useSetCurrentPlugin';
import { ModeSelection } from '../components/common/ModeSelection';
import { FetchedImagesContainer } from '../components/image-generation/FetchedImagesContainer';
import { SelectedImageContainer } from '../components/image-generation/SelectedImageContainer';
import { CroppedImageContainer } from '../components/image-generation/CroppedImageContainer';
import { ImageItems } from '../components/image-generation/ImageItems';
import { FetchImagesButton } from '../components/image-generation/FetchImagesButton';
import { GenerateImageButton } from '../components/image-generation/GenerateImageButton';
import { useAnimation } from '../context';
import { useFetchItems } from '../hooks/useFetchItems';
import { useSetImages } from '../hooks/useSetImages';
import { useFetchOutputImages } from '../hooks/useFetchOutputImages';
import { pages } from '@context/constants';

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useAnimation()
  return <input className="search-bar" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
}

export const ImageGenerationLayout = () => {
  
  useSetCurrentPlugin('image-generation')
  
  useFetchItems()
  useSetImages()
  useFetchOutputImages()
  
  const { selectedDataFile, setSelectedDataFile, mode, setMode } = useAnimation()

  return (
    <div className="animation plugin">
      <div className="configuration">
        <ModeSelection options={pages} setMode={setMode} mode={mode} />
        <FileDisplay directoryKey="animation" state={selectedDataFile} setState={setSelectedDataFile} />
        <FetchImagesButton />
        <GenerateImageButton />
        <SearchBar />
      </div>
      <div className="main image-generation" >
        <FetchedImagesContainer />
        <SelectedImageContainer />
        <CroppedImageContainer />
      </div>
    </div>
  );
};

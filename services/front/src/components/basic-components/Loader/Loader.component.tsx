import { LoaderProps } from '@components/Loader/Loader.interface';
import { LoadingBackground, LoadingSpinner } from '@styles/Loader.style';

export const Loader = ({ loading }: LoaderProps) => {
  return (
    <>
      {loading ? (
        <LoadingBackground>
          <LoadingSpinner/>
        </LoadingBackground>
      ) : (<></>)}
    </>
  );
};

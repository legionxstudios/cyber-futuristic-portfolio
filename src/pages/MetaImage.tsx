import { Helmet } from 'react-helmet-async';

const MetaImage = () => {
  return (
    <>
      <Helmet>
        <title>Tudor Stanescu | #HireMeHuman</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="h-[630px] w-[1200px] relative bg-cyberdark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyberdark/50 via-cyberdark to-cyberdark" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-8xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpink via-cybercyan to-cyberamber">
              {'>'}_#HireMeHuman
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default MetaImage;
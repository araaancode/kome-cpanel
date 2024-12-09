export default function Image({src,...rest}) {
  src = src && src.includes('https://')
    ? src
    : 'https://kome-backend.onrender.com/uploads/'+src;
  return (
    <img style={{height:'300px'}} className="w-full" {...rest} src={src} alt={''} />
  );
}

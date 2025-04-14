import Image from 'next/image';

export default function SomeComponent() {
  return (
    <div>
      <Image
        src="/placeholder-image.jpg"
        alt="Placeholder"
        width={500}
        height={300}
      />
    </div>
  );
}
interface TitleFormsProps {
  title: string;
  subtitle: string;
}

export default function TitleForms({ title, subtitle }: TitleFormsProps) {
  return (
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  );
}

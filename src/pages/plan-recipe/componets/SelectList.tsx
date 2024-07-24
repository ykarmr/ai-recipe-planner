export type SelectListItem = {
  id: number;
  title: string;
  desc: string;
};

type Props = {
  list: SelectListItem[];
  selectValue?: SelectListItem;
  onSelect: (item?: SelectListItem) => void;
};

export function SelectList(props: Props) {
  const { list, selectValue, onSelect } = props;
  const handleSelect = (item: SelectListItem) => {
    if (selectValue?.id === item.id) {
      onSelect(undefined);
    } else {
      onSelect(item);
    }
  };
  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <div
            key={item.id}
            className={`transform cursor-pointer rounded-lg border p-4 transition-transform hover:scale-105 ${
              selectValue?.id === item.id
                ? "border-black shadow-md"
                : "hover:shadow"
            }`}
            onClick={() => handleSelect(item)}
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

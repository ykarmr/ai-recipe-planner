export type SelectListItem = {
  id: number;
  title: string;
  desc: string;
};

type Props = {
  list: SelectListItem[];
  selectValue?: SelectListItem;
  onSelect: (item: SelectListItem) => void;
};

function SelectList(props: Props) {
  const { list, selectValue, onSelect } = props;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {list.map((item) => (
          <div
            key={item.id}
            className={`p-4 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
              selectValue?.id === item.id
                ? "shadow-md border-black"
                : "hover:shadow"
            }`}
            onClick={() => onSelect(item)}
          >
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectList;

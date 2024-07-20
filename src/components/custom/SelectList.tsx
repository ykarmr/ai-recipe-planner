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
      <div className="grid grid-cols-3 gap-5 mt-5">
        {list.map((item) => (
          <div
            key={item.id}
            className={`p-4 border rounded-lg hover:shadow cursor-pointer ${
              selectValue?.id === item.id && "shadow-md border-black"
            }`}
            onClick={() => onSelect(item)}
          >
            <h2 className="font-bold text-lg">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.desc}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectList;

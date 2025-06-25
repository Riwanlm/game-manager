import { Search } from "lucide-react";

type TPrivateInputsSearch = {
  titleInputref: React.RefObject<HTMLInputElement | null>;
  timePlayInputref: React.RefObject<HTMLInputElement | null>;
  ratingInputref: React.RefObject<HTMLSelectElement | null>;
  orderInputref: React.RefObject<HTMLSelectElement | null>;
};

export const PrivateInputsSearch = ({
  titleInputref,
  timePlayInputref,
  ratingInputref,
  orderInputref,
}: TPrivateInputsSearch) => {
  const handleSearch = () => {
    if (
      !titleInputref.current ||
      !timePlayInputref.current ||
      !ratingInputref.current ||
      !orderInputref.current
    ) {
      return;
    }
    // console.log(titleInputref.current.value);
    // console.log(timePlayInputref.current.value);
    // console.log(ratingInputref.current.value);
    // console.log(orderInputref.current.value);
  };

  return (
    <div className="flex w-full justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-4">
        <legend className="fieldset-legend text-center">
          Entrez vos paramètres de recherche
        </legend>

        <div className="flex flex-row gap-4">
          <div>
            <label className="label text-white">Recherchez un jeux :</label>
            <input
              type="text"
              className="input mb-4"
              placeholder="Entrez votre recherche ..."
              ref={titleInputref}
            />

            <label className="label text-white">Selectionnez une note :</label>
            <select
              defaultValue="Pick a color"
              className="select"
              ref={ratingInputref}
            >
              <option value={""}>Sans paramètre</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div>
            <label className="label text-white">
              Heure de jeu suppérieur ou égal à :
            </label>
            <input
              type="number"
              className="input mb-4"
              min="0"
              placeholder="Insérer un nombre"
              ref={timePlayInputref}
            />

            <label className="label text-white">Ordre d'affichage :</label>
            <select defaultValue="" className="select" ref={orderInputref}>
              <option value="">Sans paramètre</option>
              <option value="desc">Plus récent</option>
              <option value="asc">Moins récent</option>
            </select>
          </div>
        </div>

        <button
          className="btn btn-outline btn-accent mt-4"
          onClick={() => handleSearch()}
        >
          Lancer la recherche
          <Search size={16} />
        </button>
      </fieldset>
    </div>
  );
};

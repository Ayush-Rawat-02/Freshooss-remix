import { useContext } from 'react';
import { MyContext } from '../../MyContext';

function Suggestions() {
    const { setSearchVal, fruits, searchVal, setShowSuggestion } = useContext(MyContext)
    return (
        <div className="hidden md:block absolute top-[3.5rem] md:max-xl:right-[16.15rem] xl:right-[13.1rem] bg-[#fff6] w-[12rem]">
            {
                fruits.filter(item => {
                    return item.name.toLowerCase().startsWith(searchVal.toLowerCase());
                }).map(i => {
                    return (
                        <p className="cursor-pointer hover:bg-[#000a] font-semibold text-black hover:text-white px-2 py-[2px]" onClick={() => { setSearchVal(i.name); setShowSuggestion(false) }}>{i.name}</p>
                    )
                })
            }
        </div>
    )
}

export default Suggestions
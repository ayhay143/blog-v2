import Bestblog from "@/component/bestblog";
import Cartblog from "@/component/cartblog";
import Cartblogv2 from "@/component/cartblogv2";
import Textcard from "@/component/textcard";


export default function Home() {
  return (
    <main className="flex flex-col items-center py-15 px-34">
      <div id="1erpartie" className="flex flex-row gap-4 w-full justify-between">
        <div id="bentoblog" className="grid grid-flow-col grid-rows-2 gap-4 w-4/5 ">
          <Cartblog className="col-span-2 " bgImageUrl="MainBefore.jpg" />
          <Cartblogv2 className="col-span-1 " bgImageUrl="MainBefore.jpg" />
          <Cartblogv2 className="col-span-1 " bgImageUrl="MainBefore.jpg" />
        </div>
        <div id="peaplesFavorite">
          <h1 className="text-2xl font-bold mb-4  ml-4">People's Favorite</h1>
          <div className="grid grid-cols-1 gap-4">
            <Textcard />
            <Textcard />
            <Textcard />
            <Textcard />
            <Textcard />
          </div>
        </div>
      </div>
      <div id="editorsPicks" className="flex items-center justify-center w-full relative pt-15">
        <div className=" bg-white px-3 z-1">Editor's Picks</div>
        <div className="absolute border-t-4 border-double border-clack w-full  "></div>
      </div>
      
      
      <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4  w-full pt-15">
        <Bestblog number={1} bgImageUrl="MainBefore.jpg" />
        <Bestblog number={2} bgImageUrl="MainBefore.jpg"/>
        <Bestblog number={3} bgImageUrl="MainBefore.jpg"/>
        <Bestblog number={4} bgImageUrl="MainBefore.jpg"/>
       </div>
       
          
      
      
    </main>
  );
}

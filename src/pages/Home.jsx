import InteractiveMap from "../components-home/InteractiveMap";
import Banner from "../components-home/Banner";
import FeaturedArtifacts from  "../components-home/FeaturedArtifacts";
import TopArtifacts from "../components-home/TopArtifacs";

const Home = () => {
    return (    <div>
        <h1 className="text-4xl font-bold text-center my-6">New Collection Limited Edition </h1>
        <section className="text-4xl border-2 my-8 ">
            <Banner></Banner>
        </section>
        <section className="text-4xl border-2">
            <FeaturedArtifacts></FeaturedArtifacts>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-center my-4">Interactive Map of Historical Artifacts</h2>
          <InteractiveMap />
        </section>
        <section>
          <TopArtifacts></TopArtifacts>
        </section>
      </div>);
}
 
export default Home;
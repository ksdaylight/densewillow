import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const Portfolio: NextPage<Props> = async () => {
    return (
        <>
            <div id="sidebar">
                <nav />
            </div>
            <main>
                <section className="bg-[#666]">Home</section>
                <section id="about">About</section>
                <section id="resume">Resume</section>
                <section id="work" className="background: #f00">
                    Work
                </section>
                <section id="testimonial">Testimonial</section>
                <section id="contact" className="background: #000">
                    Contact
                </section>
                <p className="inline-block text-5xl bg-[#a0a0aa] w-[400px] border-[20px] border-red-500 ">
                    Test text
                </p>
                <h1>Cheetah Academy</h1>
                <h2>Cheetah Academy</h2>
                <p className="text-3xl">Paragraph</p>
                <FontAwesomeIcon icon={faEnvelope} size="6x" />
            </main>
        </>
    );
};

export default Portfolio;

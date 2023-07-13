import { NextPage } from 'next';
import { initQueryClient } from '@ts-rest/react-query';

import { apiBlog } from 'api-contracts';

import AdminLayout from '../../components/layout/AdminLayout';

export const baseApiUrl = 'http://127.0.0.1:3100/api'; // TODO BaseUrl 替换策略
export const apiClient = initQueryClient(apiBlog, {
    baseUrl: 'http://127.0.0.1:3100',
    baseHeaders: {
        'x-api-key': 'key',
    },
});

interface Props {}
const Admin: NextPage<Props> = () => {
    return (
        <div>
            <AdminLayout>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, placeat. Delectus
                    asperiores fugiat eaque nesciunt. Debitis deleniti autem velit iste distinctio
                    unde saepe obcaecati consequuntur rem in qui numquam doloribus ipsum officiis,
                    aperiam cupiditate itaque esse, quas sunt, a nisi tempore consequatur?
                    Consequuntur, deleniti! Nemo delectus consequatur eum sapiente esse hic
                    necessitatibus neque velit? Expedita, deserunt earum! Similique perspiciatis
                    sunt itaque atque fuga maxime, vero sit. Minima cum quod sed voluptatem itaque
                    neque esse debitis consequuntur. Possimus voluptate ratione animi molestias
                    natus. Sapiente, voluptas fuga! Veniam unde omnis quas adipisci dolorem
                    voluptate, quaerat, earum accusantium possimus nam delectus odio dolorum
                    obcaecati quos reprehenderit modi. Animi quos libero officiis esse. Laborum
                    iure, ad quaerat voluptatem magnam velit fuga, delectus maiores porro magni,
                    explicabo recusandae possimus! Nesciunt totam porro, beatae saepe accusantium
                    exercitationem possimus voluptate optio ullam deleniti explicabo, eveniet nemo
                    nobis veritatis neque fuga. Sequi aperiam corrupti accusamus ut saepe tenetur
                    consequuntur nihil ipsam dolores repellendus, modi inventore expedita harum
                    libero nobis fugiat quo iusto adipisci earum dicta explicabo provident repellat
                    quaerat? Dignissimos eos rerum iste exercitationem provident aliquam corporis
                    dicta odit temporibus doloribus nulla dolore at et minus maiores quam quia vel
                    earum commodi, sunt nihil praesentium quae possimus. Delectus nostrum nesciunt
                    provident placeat incidunt nemo nihil sequi ipsam, quas ullam beatae eaque,
                    suscipit, doloremque quis officiis quasi. Impedit natus vitae, maiores numquam
                    id vero atque, sit distinctio, amet expedita reprehenderit quas nisi eum
                    incidunt vel nulla necessitatibus. Necessitatibus modi beatae odit corrupti
                    fugiat. Molestiae fugiat, odit consequatur iure ratione earum quam officiis
                    dolore qui iusto assumenda commodi nihil dolorem ullam beatae. Quidem minus,
                    odio ratione ab reprehenderit, nisi voluptas eligendi laborum iure natus velit.
                    Unde officiis magnam, tempore ullam amet quaerat animi ipsum exercitationem
                    adipisci error a. Ipsam aperiam dolorem, sit animi earum delectus laboriosam
                    culpa assumenda ab molestias voluptates quo dolorum, dolor quia ipsum eum
                    dignissimos, vero explicabo omnis laborum perferendis. Placeat quos sed possimus
                    ea esse, porro ipsum nobis maxime minima debitis rerum tempora in expedita
                    accusamus quasi, sint quibusdam minus? Cum exercitationem incidunt harum, id, in
                    cumque optio ad hic iure doloribus quis fuga eius nisi itaque, amet maxime
                    quisquam aut tempore explicabo vitae? Ea eligendi sed adipisci. Ratione magni
                    obcaecati aliquam rerum dolorum, id assumenda quibusdam ullam corporis dolores
                    modi officia facere maxime vitae itaque pariatur ipsum velit eos ipsam dolor in
                    aut. Ipsum maxime impedit aliquam ut minus est error laudantium fuga? Iusto
                    corrupti dolorum accusantium, non facere commodi fugit voluptatibus similique
                    quaerat possimus dolor veniam. Ipsum sed consectetur consequatur illo iste est
                    adipisci magni dolor blanditiis tempore officiis expedita aut quas, sit facere
                    eligendi! Voluptatum esse
                </div>
            </AdminLayout>
        </div>
    );
};
export default Admin;

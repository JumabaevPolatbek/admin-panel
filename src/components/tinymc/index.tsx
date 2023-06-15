import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { axiosInstance } from 'authProvider';

const TinyMce = () => {
    const [state, setState] = React.useState({
        content: '',
        saved: false,
        post: {
            description: '',
        },
        urlImage: '',
        loading: false,
    });
    const _handleEditorChange = (e: any) => {
        setState({ ...state, content: e.target.getContent() });
    };

    const _handSave = () => {
        //Let push state.content which you got to server
        //can view result at console window :)
        console.log(state.content);
        setState({ ...state, saved: true });
    };

    React.useEffect(() => {
        const input = document.querySelector('input');
        if (state.loading && input) {
            input.disabled = true;
        } else if (!state.loading && input) {
            input.disabled = false;
        }
    });
    return (
        <Editor
            apiKey="dbp8v5fagykht4mq23hxl8rt30a3g8jayrhqgq3qnwhi3ygq"
            // init={{
            //     height: 300,
            //     menubar: false,
            //     plugins: [
            //         'advlist',
            //         'lists',
            //         'image',
            //         'help',
            //         'wordcount',
            //         'edit image',
            //         'mce image',
            //     ],
            //     paste_as_text: true,
            //     mobile: {
            //         toolbar_drawer: 'floating',
            //     },
            //     file_picker_types: 'file image media',
            //     toolbar:
            //         'bold italic | \
            //             alignleft aligncenter alignright alignjustify | \
            //             bullist numlist outdent indent | image | removeformat',
            //     // image_list: async function () {
            //     //     const { data } = await axiosInstance.get(
            //     //         'http://api.nukusii.uz/api/upload/files'
            //     //     );
            //     //     return data;
            //     // },
            //     // images_upload_handler: async function(
            //     //     blobInfo: any,
            //     //     success: any,
            //     //     failure: any
            //     // ) {
            //     //     let imageFile = new FormData();
            //     //     imageFile.append("files[]", blobInfo.blob());

            //     //     try {
            //     //         const {data} = await axiosInstance.post("/api/upload", imageFile)
            //     //         // const { data } = await fetch(`/api/upload`, {
            //     //         //     method: "post",
            //     //         //     body:imageFile
            //     //         // })
            //     //         success(data.fileURL);
            //     //     } catch (error) {
            //     //         // handleResponseError(error);
            //     //         failure=error
            //     //         return ;
            //     //     }
            //     // }
            //     images_upload_url: 'http://api.nukusii.uz/api/upload',
            //     images_upload_credentials: true,
            //     images_upload_handler: async (blobInfo) => {
            //         let formData = new FormData();
            //         var name = blobInfo.name;
            //         formData.append(
            //             'files',
            //             blobInfo.blob(),
            //             blobInfo.filename()
            //         );
            //         formData.append('data.name', blobInfo.name());
            //         formData.append('data.tag', blobInfo.name());
            //         console.log(blobInfo.blob().arrayBuffer());

            //         const { data: imageData } = await axiosInstance.post(
            //             'http://api.nukusii.uz/api/upload',
            //             formData
            //         );
            //         console.log(imageData);
            //         return 'OK';
            //     },
            //     image_title: true,

            //     image_advtab: true,
            //     link_list: [
            //         { title: 'My page 1', value: 'https://www.tiny.cloud' },
            //         { title: 'My page 2', value: 'http://www.moxiecode.com' },
            //     ],
            //     image_list: [
            //         { title: 'My page 1', value: 'https://www.tiny.cloud' },
            //         { title: 'My page 2', value: 'http://www.moxiecode.com' },
            //     ],
            //     image_class_list: [
            //         { title: 'None', value: '' },
            //         { title: 'Some class', value: 'class-name' },
            //     ],
            //     templates: [
            //         { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            //         { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            //         { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
            //       ],
            // }}
            init={{
                // selector: 'textarea#full-featured',
                plugins:
                    'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export footnotes mergetags autocorrect',
                tinydrive_token_provider: async () => {
                    const { data } = await axiosInstance.get(
                        'http://api.nukusii.uz/api/upload/files'
                    );
                    return [
                        {
                            title: data[0]?.hash,
                            value: data[0]?.name,
                        },
                    ];
                },
                // tinydrive_token_provider:
                //     'http://api.nukusii.uz/api/upload/files',
                tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
                tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
                tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
                mobile: {
                    plugins:
                        'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect',
                },
                menu: {
                    tc: {
                        title: 'Comments',
                        items: 'addcomment showcomments deleteallconversations',
                    },
                },
                menubar: 'file edit view insert format tools table tc help',
                toolbar:
                    'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags',
                toolbar_sticky: true,
                //   toolbar_sticky_offset: isSmallScreen ? 102 : 108,
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                link_list: async () => {
                    const { data } = await axiosInstance.get(
                        'http://api.nukusii.uz/api/upload/files'
                    );
                    return data;
                },
                // link_list: [
                //     { title: 'My page 1', value: 'https://www.tiny.cloud' },
                //     { title: 'My page 2', value: 'http://www.moxiecode.com' },
                // ],
                image_list: [
                    { title: 'My page 1', value: 'https://www.tiny.cloud' },
                    { title: 'My page 2', value: 'http://www.moxiecode.com' },
                ],
                // image_list: async () =>
                //     await axiosInstance.get(
                //         'http://api.nukusii.uz/api/upload/files'
                //     ),
                image_class_list: [
                    { title: 'None', value: '' },
                    { title: 'Some class', value: 'class-name' },
                ],
                importcss_append: true,
                templates: [
                    {
                        title: 'New Table',
                        description: 'creates a new table',
                        content:
                            '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                    },
                    {
                        title: 'Starting my story',
                        description: 'A cure for writers block',
                        content: 'Once upon a time...',
                    },
                    {
                        title: 'New list with dates',
                        description: 'New List with dates',
                        content:
                            '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                    },
                ],
                template_cdate_format:
                    '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format:
                    '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                height: 600,
                image_caption: true,
                quickbars_selection_toolbar:
                    'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                tinycomments_mode: 'embedded',
                content_style: '.mymention{ color: gray; }',
                contextmenu: 'link image editimage table configurepermanentpen',
                a11y_advanced_options: true,
                //   skin: useDarkMode ? 'oxide-dark' : 'oxide',
                //   content_css: useDarkMode ? 'dark' : 'default',
                /*
  The following settings require more configuration than shown here.
  For information on configuring the mentions plugin, see:
  https://www.tiny.cloud/docs/tinymce/6/mentions/.
  */
                mentions_selector: '.mymention',
                //   mentions_fetch: mentions_fetch,
                //   mentions_menu_hover: mentions_menu_hover,
                //   mentions_menu_complete: mentions_menu_complete,
                //   mentions_select: mentions_select,
                mentions_item_type: 'profile',
                autocorrect_capitalize: true,
                mergetags_list: [
                    {
                        title: 'Client',
                        menu: [
                            {
                                value: 'Client.LastCallDate',
                                title: 'Call date',
                            },
                            {
                                value: 'Client.Name',
                                title: 'Client name',
                            },
                        ],
                    },
                    {
                        title: 'Proposal',
                        menu: [
                            {
                                value: 'Proposal.SubmissionDate',
                                title: 'Submission date',
                            },
                        ],
                    },
                    {
                        value: 'Consultant',
                        title: 'Consultant',
                    },
                    {
                        value: 'Salutation',
                        title: 'Salutation',
                    },
                ],
            }}
        />
    );
};
export default TinyMce;
{
    /* <Editor
	initialValue={field.value}
	init={{
		height: 300,
		menubar: false,
		plugins: ["advlist autolink lists link anchor paste image"],
		paste_as_text: true,
		mobile: {
			toolbar_drawer: "floating"
		},
		file_picker_types: "file image media",
                toolbar="bold italic | \
				alignleft aligncenter alignright alignjustify | \
				bullist numlist outdent indent | image | removeformat"
		images_upload_handler: async function(
			blobInfo: any,
			success: any,
			failure: any
		) {
			let imageFile = new FormData();
			imageFile.append("files[]", blobInfo.blob());

			try {
                                const {data} = await axios.post("http://urlToHandleFileUpload", imageFile)
				success(data.fileURL);
			} catch (error) {
				handleResponseError(error);
				return;
			}
		}
	}}
	{...field}
	{...restProps}
	onEditorChange={content => setFieldValue(field.name, content)}
/> */
}

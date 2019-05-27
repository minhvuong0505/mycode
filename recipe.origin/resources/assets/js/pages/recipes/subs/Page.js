import React, { Component } from 'react';
import _ from 'lodash'
import Form from './_Form';
import cookie from 'react-cookies'
import LocalizedStrings from 'react-localization';


const style = {
    width: '7vw',
    height: '10vw',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    left:'0px'
}

class Page extends Component {
    constructor(props) {
      super(props);
        if(!PROFILES){
            if(window.location.pathname.includes("/edit")) {
                window.location.href = "/login?redirect_url=my_recipe";
            } else {
                window.location.href = "/login?redirect_url=recipe_write";
            }
        }

        let strings = new LocalizedStrings(
            {en:{
                reg:'Recipe Registration',
                title:'Title',
                pl_title:"input recipe's title",
                desc:'Simple explanation',
                pl_desc:"Input recipe's explanation within 100words.",
                cate:'Classification',
                s1:"Recipe's information setting",
                size:'Pet size',
                age:'Pet age',
                dryness:'Dry status',
                function:'Main function',
                tags:'Tag',
                close:'Exit',
                s2:'Recipe information setting',
                pre_time:'Preparation time',
                cooking_time:'Cooking time',
                difficulty:'Level of difficulty',
                cooking_utensils:'Cooking tool',
                s3:'Material Information',
                delete:'Delete',
                add:'Add',
                del_img:'Photo delete',
                content:'Please enter recipe',
                addmore:'+ Add step',
                s4:'Cooking completion',
                av:'Delete photo',
                ct:'Please register the details of the cooking completion',
                draft:'Temporary save',
                submit:'Enrollment',
                name:'Title',
                qty:"Quantity",
                unit:"Unit",
                sl_img:'Select image',
                av1:'Avatar',
                df:'Representative image',
                cook_pl:'Please separate one or more cookware by',
                pt:'Photos of materials',
                alert_empty_title: 'Please enter the recipe title',
                alert_empty_desc: 'Please enter a simple recipes description of around 100 characters',
                alert_empty_cooking_utensils: 'Please separate one or more cookware.',
                alert_empty_materials: 'Please fill in the material information',
                alert_empty_step: 'Please enter recipe step',
                alert_empty_content: 'Please enter the recipe content.',
                alert_empty_cooking_representation: 'Please register contents about cooking completion.',
                alert_submit_default_mess: 'Do you want to register the recipe?',
                alert_submit_default_edit_mess: 'Do you want to update the recipe?',
                alert_submit_save_temp: 'Do you want to save the recipe temporarily?',
                alert_recipe_updated: 'The recipe has been updated!',
                alert_sign_in_again: 'You need to sign in again.',
                alert_recipe_registered: 'The recipes are registered!',
                alert_upload_video: 'Upload video',
                alert_video_file_size: 'The file size can not exceed 8 MB.',
                alert_upload_image: 'Upload image',
                alert_image_file_size: 'The file size can not exceed 8 MB.',
                confirm_delete: 'Are you sure you want to delete?',
                confirm_add_order: 'Add order?',
                confirm_text: 'Are you sure?',
                modal_temp_delete: 'Delete all',
                modal_temp_delete_single: 'Delete',
                modal_temp_title: 'Temporary Saved Recipes',
                modal_temp_cnt_left:'Total',
                modal_temp_cnt_right:'',
                no_temporay_recipe:'There are no temporary recipe.',
                alert_temp_recipe_delete: 'Successfully deleted.',
            },
            cn: {
                reg:'配方登記',
                title:'登記',
                pl_title:'请输入食谱标题',
                desc:'簡單說明',
                pl_desc:'請輸入100字左右的簡單食譜說明.',
                cate:'分類',
                s1:'信息設定',
                size:'動物大小',
                age:'脖子的年龄',
                dryness:'乾燥程度',
                function:'主要功能',
                tags:'標籤',
                close:'關閉',
                s2:'信息設定',
                pre_time:'準備時間',
                cooking_time:'烹飪時間',
                difficulty:'難易度',
                cooking_utensils:'炊具',
                s3:'材料信息',
                delete:'刪除',
                add:'追加輸入',
                del_img:'刪除照片',
                content:'請輸入食譜題目.',
                addmore:'+ 順序追加',
                s4:'料理完成',
                av:'刪除照片',
                ct:'請登記有關料理完成的內容.',
                draft:'臨時儲存',
                submit:'登記',
                name:'材料信息',
                qty:'容量',
                unit:'單位',
                sl_img:'注册你的照片',
                av1:'代表照片',
                df:'代表形象',
                cook_pl:'1個以上的烹飪器具請用,',
                pt:'材料的照片',
                alert_empty_title: '请输入食谱标题',
                alert_empty_desc: '请输入大约100个字符的简单食谱说明',
                alert_empty_cooking_utensils: '请分开一个或多个炊具。',
                alert_empty_materials: '请填写材料信息',
                alert_empty_step: '请输入食谱步骤',
                alert_empty_content: '请输入食谱内容。',
                alert_empty_cooking_representation: '请注册有关烹饪完成的内容。',
                alert_submit_default_mess: '你要注册食谱吗？',
                alert_submit_default_edit_mess: '你想更新食谱吗？',
                alert_submit_save_temp: '你想暂时保存食谱吗？',
                alert_recipe_updated: '食谱已更新！',
                alert_sign_in_again: '你需要再次登录。',
                alert_recipe_registered: '食谱已注册！',
                alert_upload_video: '上传视频',
                alert_video_file_size: '文件大小不能超过8 MB。',
                alert_upload_image: '正在上传图片',
                alert_image_file_size: '文件大小不能超过8 MB。',
                confirm_delete: '你确定吗？',
                confirm_add_order: '你要添加订单吗？',
                confirm_text: '你确定要删除吗？',
                modal_temp_delete: '全部删除',
                modal_temp_delete_single: '删除',
                modal_temp_title: '临时存储的配方',
                modal_temp_cnt_left:'共',
                modal_temp_cnt_right:'个',
                no_temporay_recipe:'没有临时配方。',
                alert_temp_recipe_delete: '成功删除。',
            },
            it: {
                reg:'레시피 등록',
                title:'제목',
                pl_title:'레시피 제목을 입력해주세요',
                desc:'간단설명',
                pl_desc:'100자 내외의 간단한 레시피 설명을 입력해주세요',
                cate:'분류',
                s1:'레시피정보 설정',
                size:'동물 크기',
                age:'동물 나이',
                dryness:'건조 정도',
                function:'주요 기능',
                tags:'태그',
                close:'닫기',
                s2:'레시피 정보 설정',
                pre_time:'준비 시간', 
                cooking_time:'조리 시간',
                difficulty:'난이도',
                cooking_utensils:'조리기구',
                s3:'재료 정보',
                delete:'삭제',
                add:'추가입력',
                del_img:'사진 삭제',
                content:'레시피를 입력해주세요',
                addmore:'+  순서 추가',
                s4:'요리 완성',
                av:'사진 삭제',
                ct:'요리 완성에 대한 내용을 등록 해 주세요',
                draft:'임시저장',
                submit:'등록',
                name:'재료',
                qty:'용량',
                unit:'단위',
                sl_img:'사진등록하기',
                select_material_img: '사진등록',
                select_material_img_2: '사진등록하기',
                av1:'대표 사진',
                df:'대표 이미지',
                cook_pl:'1개 이상의 정보는 ,로 구분해주세요.',
                pt: '사진 자료',
                alert_empty_title: '레시피 제목을 입력해주세요',
                alert_empty_desc: '100자 내외의 간단한 레시피 설명을 입력해주세요',
                alert_empty_cooking_utensils: '1개 이상의 정보는 ,로 구분해주세요.',
                alert_empty_materials: '재료 정보 입력해주세요',
                alert_empty_step: '레시피를 입력해주세요',
                alert_empty_content: '레시피 내용을 입력하십시오',
                alert_empty_cooking_representation: '요리 완성에 대한 내용을 등록 해 주세요',
                alert_submit_default_mess: '레시피를 등록 하시겠습니까?',
                alert_submit_default_edit_mess: '레시피를 업데이트 하시겠습니까?',
                alert_submit_save_temp: '레시피를 임시저장 하시겠습니까?',
                alert_recipe_updated: '레시피가 업데이트되었습니다!',
                alert_sign_in_again: '다시 로그인해야합니다.',
                alert_recipe_registered: '조리법이 등록되었습니다!',
                alert_upload_video: '동영상 올리기',
                alert_video_file_size: '파일 크기는 8MB를 초과 할 수 없습니다.',
                alert_upload_image: '이미지 업로드 중',
                alert_image_file_size: '파일 크기는 8MB를 초과 할 수 없습니다.',
                confirm_delete: '삭제하시겠습니까?',
                confirm_add_order: '순서를 추가하시겠습니까?',
                confirm_text: '삭제하겠습니까?',
                modal_temp_delete: '전체삭제',
                modal_temp_delete_single: '삭제',
                modal_temp_title: '임시 저장한 레시피',
                modal_temp_cnt_left:'총',
                modal_temp_cnt_right:'개',
                no_temporay_recipe:'임시 제조법이 없습니다.',
                alert_temp_recipe_delete: '성공적으로 삭제되었습니다.',
            }});

        this.state = {
            recipes: {
                title: '',
                desc: '',
                materials: {
                },
                age:'31',
                size:'27',
                cate:'20',
                prepare_time:'45',
                cooking_time:'52',
                difficulty:'70',
                function:'38',
                dryness:'35',
                steps:{

                },
                content:'',
                contents:{},
                cooking_representation:{

                },
                videos: '',
                user_id: PROFILES.id,
                cooking_utensils:'',
                tags:[],
                status:1, //default 1 register,
                tokens:'',
                post_id:props.routeParams.id,
            },
            videoUrl: "",
            todos: [1],
            number: 1,
            errors: {},
            cates:[],
            options:[],
            file: '',
            materialsPreviewImageList: [],
            imagePreviewUrl: {},
            step_number:1, 
            limits:[1],
            type:'img',
            tags: [],
            thumbs: [1,2,3],
            inc:-1,
            number_trash:0,
            hasError: false,
            message: null,
            languages:strings,
            type_lang:'it',
            temp_recipe_list: [],
            temp_recipe_list_cnt: 0
        }

        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.changeLang = this.changeLang.bind(this);

        //upload
        this.uploadAdd = this.uploadAdd.bind(this);
        this.uploadDel = this.uploadDel.bind(this);
        this.deleteImage = this.deleteImage.bind(this)
        this.renderUploads = this.renderUploads.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleVideoChange = this.handleVideoChange.bind(this)
        this.renderRespectation = this.renderRespectation.bind(this)
        this.MaterialThumbImages = this.MaterialThumbImages.bind(this);
        this.MaterialThumbImageClick = this.MaterialThumbImageClick.bind(this);
        this.ToggleBlockDisplay = this.ToggleBlockDisplay.bind(this);
        //thums
        this.thumbDelete = this.thumbDelete.bind(this)
        this.loadTemporaryRecipeList = this.loadTemporaryRecipeList.bind(this);
        this.deleteTemporaryRecipe = this.deleteTemporaryRecipe.bind(this);
      //get recipe
        if(props.routeParams.id != undefined && window.location.pathname.includes("/recipe") && window.location.pathname.includes("/edit"))
        {
            this.getRecipe()
        }

      //sync
      this.loadTemporaryRecipeList();
    }

    
    loadTemporaryRecipeList()
    {
        let user_id = '';
        if(PROFILES != undefined)
        {
            user_id = PROFILES.id;
        }else{
            window.location.href = "/login"
        }
    
        if(user_id) user_id = ',user_id='+user_id
        
        axios.get('/api/v1/post?embeds=user&sorts=-id&filters=status=3'+user_id)
        .then((res)  => {
            console.log(res.data);
            this.setState({ temp_recipe_list: res.data.result, temp_recipe_list_cnt:res.data.meta.total_count}); 
        }).catch((err) => {
            console.log(err);
        });
    }

    deleteTemporaryRecipe(id)
    {
        let {languages} = this.state;
        let {type_lang} = this.state;
        let lang = localStorage.getItem('lang');
        if(lang) type_lang = lang;
        languages.setLanguage(type_lang);
        var deleteId = id;
        if(id == -1) {
            // delete all
            //get all delete id
            var deleteArray = [];
            $('[datarecipeid]').each(function(e,i){
                deleteArray.push($(this).attr('datarecipeid'));
            });
            deleteId = deleteArray.join(',');
        }
        refreshToken();
        axios.delete('/api/v3/recipes/'+deleteId, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKENS}`
            }
        }).then(res => {
            if (res.status === 204) {
                alert(languages.alert_temp_recipe_delete);
                this.loadTemporaryRecipeList();
            } else {
                return res;
            }
        })
        .catch(err => {
            if (err.response) {
                const errors = err.response.data
                this.setState({ errors, hasError: true })
            }
        });
    }
    
    showTempList()
    {
        $('#temporary_list_modal').modal('toggle');
    }

    ToggleBlockDisplay(block_name) 
    {
        $('#'+block_name).slideToggle();
    }
    
    onChange({ name, value, index }) {
        const { recipes } = this.state

        if(name == 'name' || name == 'quantity' || name == 'unit'){
            index = index + 1
            if(recipes['materials'][index] != undefined)
                recipes['materials'][index][name] = value
            else{
                
                recipes['materials'][index] = {}
                recipes['materials'][index][name] = value
            }
                
        }else if(name == 'contents'){
            if(recipes['steps'][index] != undefined){
                recipes['steps'][index]['name'] = 'step'+index
                recipes['steps'][index]['content'] = value
            }else{
                recipes['steps'][index] = {}
                recipes['steps'][index]['name'] = 'step'+index
                recipes['steps'][index]['content'] = value
            }
        } else if (name == "videos") {
            recipes['videos'] = value;
        } else{
            recipes[name] = value
        }
        
        console.log(this.state.recipes)
        this.setState({ recipes })
    }

    MaterialThumbImages(e, index) 
    {
        let reader = new FileReader();
        let file = e.target.files[0];
        
        //valid 
        if(this.isImage(file.name) !== true){
            alert('이미지 업로드하기');   
            return false;
        }
        //valid size
        if(file.size > 1024*1024*8){
            alert('파일 크기는 8MB를 초과 할 수 없습니다.');
            return false;
        }

        const {type} = this.state;
        const { recipes } = this.state;
        const { materialsPreviewImageList } = this.state;
        
        // For material index + 1
        index = index + 1;
        var _thisPam = this;

        reader.onloadend = (e) => {
            // var previewImage = (<div style={{height:'50px', width:'50px', borderRadius: "5px", display: "block", backgroundImage: `url(${reader.result})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}} ></div>);
            materialsPreviewImageList[index] = reader.result;
            var data = {'file': reader.result };
            $.ajax({
                type: 'POST',
                url: '/api/v2/fileupload',
                data: data,
                success: function(response) {
                    if(response){
                        if(recipes['materials'][index] != undefined) {
                            recipes['materials'][index]['images'] = 'tmp/'+response.file;
                        }else{
                            recipes['materials'][index] = {};
                            recipes['materials'][index]['images'] = 'tmp/'+response.file;
                        }
                        _thisPam.forceUpdate();
                    }
                },
                error: function(response) {
                    
                },
            });
        }
        this.setState({ materialsPreviewImageList });
        this.setState({ recipes });
        
        reader.readAsDataURL(file);
    }

    MaterialThumbImageClick(e, index)
    {
        $(`#material-${index}`).click();
    }

    register(e) {
        e.preventDefault();
        console.log(e.target.value);
        let {languages} = this.state;
        let {type_lang} = this.state;
        let lang = localStorage.getItem('lang');
        if(lang) type_lang = lang;
        languages.setLanguage(type_lang);

        const { recipes } = this.state;
        const {videoUrl} = this.state;
        
        if(!recipes['title']){
            // alert('레시피 제목을 입력해주세요')
            alert(languages.alert_empty_title);
            return false
        }

        if(!recipes['desc']){
            // alert('100자 내외의 간단한 레시피 설명을 입력해주세요')
            alert(languages.alert_empty_desc);
            return false
        }        
        
        if(!recipes['cooking_utensils']){
            // alert('1개 이상의 정보는 ,로 구분해주세요.')
            alert(languages.alert_empty_cooking_utensils);
            return false
        }

        if(!recipes['materials']){
            // alert('재료 정보 입력해주세요')
            alert(languages.alert_empty_materials);
            return false
        }
        
        if(!recipes['steps']){
            // alert('레시피를 입력해주세요')
            alert(languages.alert_empty_step);
            return false
        } 
        
        if(!recipes['content']){
            // alert('레시피 내용을 입력하십시오');
            alert(languages.alert_empty_content);
            return false;
        }

        if(!recipes['cooking_representation']){
            // alert('요리 완성에 대한 내용을 등록 해 주세요')
            alert(languages.alert_empty_cooking_representation);
            return false
        }
        // var _mess = '레시피를 등록 하시겠습니까?';
        var _mess = languages.alert_submit_default_mess;
        if(window.location.pathname.includes("/edit")) 
        {
            // _mess = '레시피를 업데이트 하시겠습니까?';
            _mess = languages.alert_submit_default_edit_mess;
        }

        var eTargetValue = e.target.value;
        if(e.target.value == 2){
            //save to temp
            recipes['status'] = 3;
            this.setState({ recipes });
            // _mess = '레시피를 임시저장 하시겠습니까?';
            _mess = languages.alert_submit_save_temp;
        }

        const con = confirm(_mess)
        if(con !==true) return false

        //request new token
        refreshToken();

        if(recipes.id != undefined) 
        {
            var _ID = "";
            // PUT - EDIT
            _ID = "/"+ recipes.id;
            //
            axios.put('/api/v3/recipes'+_ID, JSON.stringify(recipes), {headers:{
                'Authorization': `Bearer ${TOKENS}`
            }})
            .then(res => {
                console.log(res);
                if (res.status == 201 || res.status == 200) {
                    // alert("레시피가 업데이트되었습니다!");
                    alert(languages.alert_recipe_updated);
                    if(eTargetValue == 2)
                    {
                        window.location.href = "/";
                    } else {
                        window.location.href = "/my_recipes";
                    }
                    // this.setState({ message: 'created successfully' });
                    this.setState({message: languages.alert_recipe_updated});
                } else {
                    console.log(res);
                    return res;
                }
            })
            .catch(err => {
                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
                alert(languages.alert_sign_in_again);
                window.location.href = '/logout?redirect_url=recipe_write';
            });
        } else {
            // POST - WRITE
            $.ajax({
                type: "POST",
                url: "/api/v3/recipes",
                data: JSON.stringify(recipes),
                contentType: 'application/json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization",  `Bearer ${TOKENS}`);
                },
                success(res, textStatus, xhr) {
                    console.log(xhr);
                    if (xhr.status == 201 || xhr.status == 200) {
                        // alert("조리법이 등록되었습니다!");
                        alert(languages.alert_recipe_registered);
                        if(eTargetValue == 2)
                        {
                            window.location.href = "/";
                        } else {
                            window.location.href = "/my_recipes";
                        }
                        // this.setState({ message: 'created successfully' });
                        this.setState({ message: languages.alert_recipe_registered });
                    } else {
                        return res;
                    }
                },
                error(err){
                    console.log(err);
                    if (err.response) {
                        const errors = err.response.data;
                        this.setState({ errors, hasError: true });
                    }
                    alert(languages.alert_sign_in_again);
                    window.location.href = '/logout?redirect_url=recipe_write';
                }
            });
        }
    }

    resetErrors() {
        this.setState({
            errors: {},
            hasError: false,
        })
    }

    resetMessage() {
        this.setState({ message: null })
    }

    renderErrors() {
        const { errors, hasError } = this.state

        if (!hasError) return null
        return (
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>                
                <p>{this.state.errors.message}</p>
            </div>
        )
    }


    //case edit
    getRecipe() {
        const { recipes } = this.state;
        
        axios.get(`/api/v1/post?filters=id=${recipes.post_id}`)//${recipes['post_id']}
        .then(response => {
            if(response.data.result)
                this.updateRecipe(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    updateRecipe(recipes) {     
        //get Json   
        let data = (recipes[0]);

        if(recipes.length > 0){
            let materials = JSON.parse(data.materials)
            let steps = JSON.parse(data.steps)
            let res = JSON.parse(data.cooking_representation)

            data.materials = materials
            data.steps = steps
            data.cooking_representation = res
            var _limit = Object.keys(steps);

            console.log(data)
            this.setState({recipes:data, limits: _limit});     
        }   
    }

    componentDidMount(){
        this.getRecipe()
        //get categories
        axios.get('/api/v1/categories?filter=parent_id=1')
            .then(response => {
                this.setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        //get options
        axios.get('/api/v1/options')
            .then(response => {
                this.setOptions(response.data.result);
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    componentWillReceiveProps(nextProps) {
        const {recipes} = this.state;
        console.log(recipes.post_id);
        console.log(nextProps.params.id);
        
        if(recipes.post_id == undefined) 
        {
            recipes.post_id = nextProps.params.id;
            this.setState({recipes});
            this.getRecipe();
            console.log(recipes);
            $('html, body').animate({
                scrollTop: 0
            }, 0);
            $('#temporary_list_modal').modal('toggle');
        } else {
            if(recipes.post_id != nextProps.params.id) 
            {
                recipes.post_id = nextProps.params.id;
                this.setState({recipes});
                this.getRecipe();
                $('html, body').animate({
                    scrollTop: 0
                }, 0);
                $('#temporary_list_modal').modal('toggle');
            }
        }
    }

    setOptions(options){
        this.setState({ options })
    }

    setCategories(cates){
        this.setState({ cates:cates['result'] })
    }

    renderMessage() {
        const { message } = this.state
        
        if (message) {
            return (
                <div className="alert alert-success alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p><strong>Success!</strong> { message }</p>
                </div>
            )
        }
    }



    handleAdd(){
        const con = confirm(' 등록하시겠습니까?')
        if(con !== true) return false

        let number = this.state.todos.length + 1
        if(number > 5) return false
        
        const {todos} = this.state
        todos.push(number)

        this.setState({todos})
        this.setState({number})        
    }

    handleDel(){
        const con = confirm(' 등록하시겠습니까?')
        if(con !== true) return false

        const {todos} = this.state
        let number = this.state.todos.length
        const {recipes} = this.state

        let i = todos.indexOf(number);
        if(i != -1 && i != 0){
            todos.splice(i, 1);            
            delete recipes['materials'][number]
            number = this.state.number - 1
        }
        console.log(recipes)
        this.setState({todos})
        this.setState({number})  
        this.setState({recipes})  
    }

    //upload
    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }
  
    isImage(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
        case 'jpeg':
            //etc
            return true;
        }
        return false;
    }
  
    isVideo(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        case '3gp':
            // etc
            return true;
        }
        return false;
    }

    handleVideoChange(e, index) {
        e.preventDefault()
        const {imagePreviewUrl} = this.state        
        const { recipes } = this.state

        const data = new FormData();
        let reader = new FileReader();
        data.append('file', e.target.files[0])
        data.append('filename', e.target.value)
        
        let file = e.target.files[0]
        //check video
        if(this.isVideo(file.name) !== true){
            alert('동영상 올리기');
            return false
        }

        //valid size
        if(file.size > 1024*1024*8){
            alert('파일 크기는 8MB를 초과 할 수 없습니다.');
            return false;
        }

        reader.onloadend = (e) => {
            imagePreviewUrl[index-1] = {
                'url':reader.result,
                'type' : 'video'
            } 
            this.setState({ imagePreviewUrl })
        }

        fetch('/api/v2/fileuploadVideo', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                if(recipes['steps'][index] != undefined){
                    recipes['steps'][index]['videos'] = 'tmp/'+body.fileName
                    recipes['steps'][index]['name']  = 'step'+index
                }else{
                    recipes['steps'][index] = {}
                    recipes['steps'][index]['videos'] = 'tmp/'+body.fileName
                    recipes['steps'][index]['name']  = 'step'+index
                }                
            });
        });
        
        console.log(imagePreviewUrl)
        this.setState({ recipes })
        this.setState({ imagePreviewUrl })
        reader.readAsDataURL(file)   
    }

    handleCamera(e, index){
        let file = e.target.files[0];
        //valid 
        if(this.isImage(file.name) === true){
           this.handleImageChange(e, index)
        }else if(this.isVideo(file.name) !== true){
            this.handleVideoChange(e, index)
        }
    }
    
    handleImageChange(e, index) {
        let reader = new FileReader();
        let file = e.target.files[0];
        //valid 
        if(this.isImage(file.name) !== true){
            alert('이미지 업로드 중');
            return false;
        }

        //valid size
        if(file.size > 1024*1024*8){
            alert('파일 크기는 8MB를 초과 할 수 없습니다.');
            return false;
        }

        const {type} = this.state  
        const { recipes } = this.state
        const {imagePreviewUrl} = this.state

        reader.onloadend = (e) => {
            
            imagePreviewUrl[index] = {
                'url': reader.result,
                type: 'img'
            }

            this.setState({
                file: file,
                imagePreviewUrl:imagePreviewUrl
            }); 
            
            var data = {'file': reader.result };

            $.ajax({
                type: 'POST',
                url: '/api/v2/fileupload',
                data: data,
                success: function(response) {
                    if(response){
                        if(recipes['steps'][index] != undefined){
                            recipes['steps'][index]['images'] = 'tmp/'+response.file
                            recipes['steps'][index]['name']  = 'step'+index
                        }else{
                            recipes['steps'][index] = {}
                            recipes['steps'][index]['images'] = 'tmp/'+response.file
                            recipes['steps'][index]['name']  = 'step'+index
                        }                        
                    }                    
                },
                error: function(response) {
                    
                },
            });
        }

        //console.log(imagePreviewUrl)
        this.setState({ recipes })
        reader.readAsDataURL(file)   
    }
    
    deleteImage(index) {
        let { imagePreviewUrl } = this.state;
        let { recipes } = this.state;
        const con = confirm('삭제하시겠습니까?');
        if(con !== true) return false;
        
        if(index > 1) {
            delete imagePreviewUrl[index-1];
        } else {
            imagePreviewUrl = {};
        }
        delete recipes["steps"][index]['images'];
        
        this.setState({imagePreviewUrl});
    }

    changeLang({name,value}){
    this.setState({type_lang:value});
    localStorage.setItem('lang', value); 
    }
  
    uploadAdd(){
        const con = confirm('순서를 추가하시겠습니까?');
        if(con !== true) return false
        const {limits} = this.state

        let step_number = limits.length + 1;
        if(step_number > 5) return false
        limits.push(step_number)
  
        this.setState({limits})
        this.setState({step_number})        
    }
  
    uploadDel(){
        const con = confirm('삭제하시겠습니까?')
        if(con !== true) return false

        const {limits} = this.state
        let step_number = limits.length + 1;

        let i = limits.indexOf(step_number);
        if(i != -1 && i != 1){
            limits.splice(i, 1);
            delete recipes['steps'][i]
            step_number = this.state.step_number - 1
        }
  
        this.setState({limits})
        this.setState({step_number})  
    }
  
    renderUploads(index){
        const {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        const {recipes} = this.state
        let contents
        //edit
        //image or video
        // if(recipes['steps'][index]['images']){
        //     if(imagePreviewUrl[index] && imagePreviewUrl[index]['type'] == 'img'){
        //         $imagePreview = (<img style={{'height':'23vw', 'width':'24vw'}} src={imagePreviewUrl[index]['url']} />);
        //     }else{
        //         $imagePreview = (<img style={{'height':'23vw', 'width':'24vw'}} src={CDN_URL+recipes['steps'][index]['images']} />);
        //     }                
        // }else if(recipes['steps'][index]['videos']){
        //     if (imagePreviewUrl[index] && imagePreviewUrl[index]['type'] =='video') {
        //         $imagePreview = (
        //         <video controls style={{height:'23vw', width:'23vw'}}>
        //             <source type="video/webm" src={imagePreviewUrl[index]['url']} />
        //             <source type="video/mp4" src={imagePreviewUrl[index]['url']} />
        //         </video>
        //     )
        //     }else{
        //         $imagePreview = (
        //             <video controls style={{height:'23vw', width:'23vw'}}>
        //                 <source type="video/webm" src={CDN_URL+recipes['steps'][index]['videos']} />
        //                 <source type="video/mp4" src={CDN_URL+recipes['steps'][index]['videos']} />
        //             </video>
        //             )
        //     }
            
        // }else{
        //     //insert
            var _name = "";
            var _imgUrl = "";
            var _content = "";
            if(recipes.steps[index] != undefined) 
            {
                _content = recipes.steps[index]['content'];
                _imgUrl = recipes.steps[index]['images'];
                _name = recipes.steps[index]['name'];
            }
            if(imagePreviewUrl[index] && imagePreviewUrl[index]['type'] == 'img'){
                $imagePreview = (<img style={{'height':'23vw', 'width':'24vw'}} src={imagePreviewUrl[index]['url']} />);
            }else if (imagePreviewUrl[index] && imagePreviewUrl[index]['type'] =='video') {
                $imagePreview = (
                    <video controls style={{height:'23vw', width:'23vw'}}>
                        <source type="video/webm" src={imagePreviewUrl[index]['url']} />
                        <source type="video/mp4" src={imagePreviewUrl[index]['url']} />
                    </video>
                )
            }else{
                $imagePreview = '';
            }
            
        //}   
        if(_imgUrl != "" && _imgUrl != undefined) 
        {
            $imagePreview = (<img style={{'height':'23vw', 'width':'24vw'}} src={CDN_URL+_imgUrl} />);
        }
        //language
        let {languages} = this.state;
        let {type_lang} = this.state;
        let lang = localStorage.getItem('lang');
        if(lang) type_lang = lang;
        languages.setLanguage(type_lang);

        return  <div key={`tod-${index}`} className="steps">
        <div className="step-title">STEP {index}</div>
            <div className="step-content">
                <div className="action-photo">
                    <a className="action camera" style={{position:'relative'}}>
                    <input className="action images" 
                            type="file"
                            style={style} 
                            id={`ip-${index}`}
                            onChange={(e)=>this.handleCamera(e,index)} />                
                    </a>

                    <a style={{position:'relative'}} className="action images" >    
                        <input className="action images" 
                            type="file"
                            style={style} 
                            id={`ip-${index}`}
                            onChange={(e)=>this.handleImageChange(e,index)} />                
                            </a>

                    <a style={{position:'relative', display: "none"}} className="action video">
                        <input className="action video"
                                type="file"
                                style={style} 
                                id={`ip-${index}`}
                                onChange={(e)=>this.handleVideoChange(e,index)} />
                    </a>

                </div>
                <div className="add-photo">
                    <div className="photo">
                        <div className="img" style={{'height':'23vw'}}>
                            {$imagePreview}
                        </div>
                        <button className="btn btn-outline" onClick={(e) => this.deleteImage(index)} type="button">{languages.del_img}</button>
                    </div>
                    <div className="recipe">
                        <textarea className="form-control" value={_content} name="contents" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value, index}) } placeholder={languages.nt} />                            
                    </div>
                </div>
            
            </div>
    </div>
    }

    renderRespectation(index){
        const {thumbs} = this.state;
        const {recipes} = this.state;
        //language
        let {languages} = this.state;
        let {type_lang} = this.state;
        let lang = localStorage.getItem('lang');
        if(lang) type_lang = lang;
        languages.setLanguage(type_lang);
        let lbal;
        var _videosUrl = "";
        var _showVideoStyle = {padding: "4.63vw",display: "none"};
        if(recipes['videos'] != null && recipes.videos != "") {
            _videosUrl = recipes['videos'];
            _showVideoStyle = {padding: "4.63vw",display: "block"};
        }
        return <div>
            <div className="action-photo">
                <a href="#" style={{position:'relative'}} className="action camera" >    
                    <input className="action camera" 
                        type="file"
                        style={style} 
                        id={`ip-${index}`}
                        onChange={(e)=>this.thumbImages(e,index)} />                
                </a>
                <a href="#" style={{position:'relative'}} className="action images" style={{display:"none"}}>    
                    <input className="action images" 
                        type="file"
                        style={style} 
                        id={`ip-${index}`}
                        onChange={(e)=>this.thumbImages(e,index)} />                
                        </a>
                <a href="javascript:$('.input_upload_video').slideToggle();" style={{position:'relative'}} className="action video">
                </a>
            </div>
            <div className="row form-group box-group input_upload_video" style={_showVideoStyle}>
                <div className="col-xs-3"><label>Video Url:</label></div>
                <div className="col-xs-9"><input className="form-control" type="text" name="videos" value={_videosUrl} placeholder="Video Url" onChange={ (e) => this.onChange({ name:e.target.name, value:e.target.value}) } /></div>
            </div>
            <div className="add-photo photo-grid">
                <div className="list-photo">
                {this.state.thumbs.map((thumb, key) => {
                    if(key == 0) lbal = (<button className="btn btn-default btn-remove" type="button">{languages.av1}</button>)
                    else lbal = ''

                    let img = ''
                    if(recipes['cooking_representation'][key]){
                        if(recipes['cooking_representation'][key]['images'] != undefined){
                            if(thumb.url != undefined)
                                img = thumb.url
                            else
                                img = (<img style={{height:'28vw', width:'28vw'}} src={CDN_URL+recipes['cooking_representation'][key]['images']} />)
                        }else{
                            img = thumb.url
                        }
                    }else{
                        img = thumb.url
                    }
                    
                    return <div key={`tb-${key}`} className="photo" >
                        <div className="img" style={{height:'28vw'}}>
                            {img}
                            {lbal}
                        </div>

                        <button className="btn btn-outline" onClick={(e) => this.thumbDelete(key)} type="button">{languages.del_img}</button>
                    </div> 
                })}                
                
                </div>
                <div className="recipe">
                    <textarea className="form-control" value={recipes['content']} name="content" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value, index}) } placeholder={languages.ct} />
                </div>
            </div>
        </div>
    }

    thumbDelete(index){
        const { thumbs } = this.state;        
        
        if(thumbs[index]['url'] != undefined){
            const con = confirm(' 등록하시겠습니까?')
            if(con !== true) return false

            delete thumbs[index]['url']
            this.setState({thumbs})
        }
    }

    thumbVideos(e, index) {
        e.preventDefault()
        const {thumbs} = this.state        
        const { recipes } = this.state

        const data = new FormData();
        let reader = new FileReader();
        data.append('file', e.target.files[0])
        data.append('filename', e.target.value)
        
        let file = e.target.files[0]
        //check video
        if(this.isVideo(file.name) !== true){
            alert('동영상 올리기');
            return false
        }

        //valid size
        if(file.size > 1024*1024*8){
            alert('파일 크기는 8MB를 초과 할 수 없습니다.');
            return false;
        }
        //set range
        let { inc } = this.state
        inc = inc + 1;
        if(inc == 2){
            inc = -1
            index = 2
        }else{
            index = inc
        }
        
        reader.onloadend = (e) => {
            thumbs[index] = {
                'url':(<video controls style={{height:'28vw', width:'28vw'}}>
                <source type="video/webm" src={reader.result} />
                <source type="video/mp4" src={reader.result} />
            </video>),
                'type' : 'video'
            } 
            this.setState({ thumbs })
        }

        fetch('/api/v2/fileuploadVideo', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                if(recipes['cooking_representation'][index] != undefined){
                    recipes['cooking_representation'][index]['videos'] = 'tmp/'+body.fileName
                }else{
                    recipes['cooking_representation'][index] = {}
                    recipes['cooking_representation'][index]['videos'] = 'tmp/'+body.fileName
                }                  
            });
        });
        
        console.log(thumbs)
        this.setState({ recipes })
        this.setState({ thumbs })
        reader.readAsDataURL(file)   
    }

    thumbImages(e, index) {
        let reader = new FileReader();
        let file = e.target.files[0];
        
        //valid 
        if(this.isImage(file.name) !== true){
            alert('이미지 업로드하기');   
            return false;
        }
        //valid size
        if(file.size > 1024*1024*8){
            alert('파일 크기는 8MB를 초과 할 수 없습니다.');
            return false;
        }

        const {type} = this.state  
        const { recipes } = this.state
        const { thumbs } = this.state
        this.setState({type: 'img'})
        
        let { inc } = this.state
        inc = inc + 1;
        if(inc == 2){
            inc = -1
            index = 2
        }else{
            index = inc
        }

        reader.onloadend = (e) => {            
            thumbs[index] = {'url': <img style={{height:'28vw', width:'28vw'}} src={reader.result} />}

            this.setState({
                file: file,
                thumbs
            }); 
            
            var data = {'file': reader.result };
            $.ajax({
                type: 'POST',
                url: '/api/v2/fileupload',
                data: data,
                success: function(response) {
                    if(response){
                        if(recipes['cooking_representation'][index] != undefined){
                            recipes['cooking_representation'][index]['images'] = 'tmp/'+response.file
                        }else{
                            recipes['cooking_representation'][index] = {}
                            recipes['cooking_representation'][index]['images'] = 'tmp/'+response.file
                        }                        
                    }                    
                },
                error: function(response) {
                    
                },
            });
        }

        this.setState({ recipes })
        this.setState({ inc })
        reader.readAsDataURL(file)   
    }

    renderSubmit(){
        return <div className="actions-bottom text-center">
            <button className="btn btn-outline" onClick={ (e) => this.onSubmitTerm} type="button">임시저장 <span>4</span></button>
            <button className="btn btn-default" type="submit" onClick={ (e) => this.register} type="button">등록</button>
        </div>
    }

    render() {
        return (
            <main className="site-main">
                {this.renderErrors()}
                {this.renderMessage()} 
                <Form showTempList={this.showTempList} deleteTemporaryRecipe={this.deleteTemporaryRecipe} changeLang={this.changeLang} type_lang={this.state.type_lang} languages={this.state.languages} {...this.state} renderDefault={this.renderDefault} 
                    onChange={this.onChange} register={this.register} MaterialThumbImages={this.MaterialThumbImages} registerTerm={this.registerTerm} handleAdd={this.handleAdd} 
                    renderCategories={this.renderCategories} renderSubmit={this.renderSubmit} renderRespectation={this.renderRespectation}
                     uploadAdd={this.uploadAdd} uploadDel={this.uploadDel} ToggleBlockDisplay={this.ToggleBlockDisplay} renderUploads={this.renderUploads} MaterialThumbImageClick={this.MaterialThumbImageClick}  handleDel={this.handleDel} />
            </main>
        );
    }
}

export default Page;
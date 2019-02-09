var Application = {
	initApplication: function(){
		//bagian admin
		$(document).ready(function(){
		$('#login').on('click',function(){
			Application.initLogin();
		});
		})
		
		$('#reset').on('click', function(){
			var nim = $('#nim-a').val();
			var nama = $('#nama-a').val();
			var tujuan = $('#tujuan').val();
			var keluhan = $('#keluh').val();

			nim="";
			nama="";
			tujuan="";
			keluhan="";
		});

		$('#logout').on('click', function(){
			Application.initLogout();
		})

		$(document).ready(function(){
			$('#submit').on('click',function(){
			Application.initForm();
		});
		})

		$(document).ready(function(){
		$('#tekan').on('click',function(){
			Application.initShowDataAdmin();
		});
		})

		$(document).ready(function(){
		$('#save').on('click',function(){
			Application.initEditAdmin();
		});
		})

		},
    //fungsi login
	initLogin : function(){
		//buat nganu variabelnya
		var nim = $('#nim').val();
		var pass = $('#pass').val();
		//cek kalo tydack ada isinya
		if(nim=="" || pass==""){
			alert("Tolong isi data");
			return false;
		}
		else if (nim=="admin"){
			$.ajax({
				type: 'post',
				url: 'http://playon-id.com/praktikum/pjklapor/login.php',
				data:{
					login:1,
					nimphp:nim,
					passphp:pass
				},
				success : function(dataObject){
			// if(dataObject.response=='success')
					var nim = dataObject.nim + "";
					var nama = dataObject.nama + "";
					$.mobile.changePage('#page-admin');
					$('#nim-a').append(nim);
					$('#nama-a').append(nama);
				}
			});
		}
		else if(!nim==""||pass=="") {
			$.ajax({
				type: 'post',
				url: 'http://playon-id.com/praktikum/pjklapor/login.php',
				data:{
					login:1,
					nimphp:nim,
					passphp:pass
				},
			success : function(dataObject){
				// var page = $('#page-three');
				// $.mobile.pageContainer('change',page,{});
				$.mobile.changePage('#page-three');
			}
		});
		}
	},

	initForm : function(){
		var nim = $('#nim-a').val();
		var nama = $('#nama-a').val();
		var tujuan = $('#tujuan').val();
		var keluhan = $('#keluh').val();
		$.ajax({
			url: 'http://playon-id.com/praktikum/pjklapor/tambahlapor.php',
			type: 'post',
			data:{
					nimphp:nim,
					namaphp:nama,
					tujuanphp:tujuan,
					keluhanphp:keluhan
				},
			success: function(dataObject){
				$.mobile.changePage('#page-four');
				
			}
		})
	},

	initLogout : function(){
		$.ajax({
			url : 'http://playon-id.com/praktikum/pjklapor/logout.php',
			type : 'post',

			success : function(dataObject){
			$.mobile.changePage('#page-one');
			}

		})

	},

	initShowDataAdmin: function(){
		$.ajax({
			url: 'http://playon-id.com/praktikum/pjklapor/lihatData.php',
			type : 'get',

			success : function(dataObject){
				var appendDetail = '';
				for (var i = 0; i < dataObject.length; i++) {
                var tbdy = $("#table-detailMhs tbody");
                        appendDetail = appendDetail + '<tr><td>' +
                            dataObject[i].nim + '</td><td>' + 
                            dataObject[i].nama + '</td><td>' +
                            dataObject[i].tujuan + '</td><td>' + 
                            dataObject[i].keluhan + '</td></tr>';
                    
                }
                $('#table-detailMhs tbody').append(appendDetail);
			}
		});
	},

	initEditAdmin : function() {
		var pass1 = $('#newpass').val();
		var pass2 = $('#renewpass').val();
		if(pass1==pass2){
			$.ajax({
			url : 'http://playon-id.com/praktikum/pjklapor/editAdmin.php',
			type : 'post',
			data:{
					passad:pass2
				},
			success : function(dataObject){
				$.mobile.changePage('#page-admin');
			},
		});
		}
		else{
			alert("password tidak cocok");
			pass1="";
			pass2="";
			return false;
	}
	}
};
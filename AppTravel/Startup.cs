using AppTravel.Common;
using AppTravel.Common.Utils;
using AppTravel.Domain.Interfaces;
using AppTravel.Infra.Data.Context;
using AppTravel.Infra.Data.Repository;
using AppTravel.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Globalization;

namespace AppTravel
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("pt-BR");
                options.SupportedCultures = new List<CultureInfo> { new CultureInfo("pt-BR") };
            });

            #region Conexão - ConnectionString
            ProjectConfigUtils.connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<AppTravelContext>(options => options.UseSqlServer(ProjectConfigUtils.connectionString));
            #endregion

            #region Configurações de Diretórios
            var directoriesSection = Configuration.GetSection("directories");
            ProjectConfigUtils.resources = (string)directoriesSection.GetValue(typeof(string), "resources");
            #endregion

            services.AddMvc().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });


            #region DependencyInjection
            // Repsitory
            //services.AddTransient<IUsuarioRepository, UsuarioRepository>();
            //services.AddTransient<ILocalRepository, LocalRepository>();
            //services.AddTransient<IAvaliacaoRepository, AvaliacaoRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<ILocalRepository, LocalRepository>();
            services.AddScoped<IAvaliacaoRepository, AvaliacaoRepository>();
            services.AddScoped<IInteresseRepository, InteresseRepository>();


            // Service
            services.AddScoped<UsuarioService>();
            services.AddScoped<LocalService>();
            services.AddScoped<AvaliacaoService>();
            services.AddScoped<RecomendacaoService>();
            services.AddScoped<InteresseService>();
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

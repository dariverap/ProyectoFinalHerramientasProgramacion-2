using api_ferreteria.Entitys;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_ferreteria.Controllers
{
    //indiacmos que es un controlador
    [ApiController]
    //definir la ruta de acceso al controlador
    [Route("api-ferreteria/cliente")]
    //Controller base es una herencia para que sea un controlador
    public class ClienteController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ClienteController(ApplicationDbContext context)
        {
            this.context = context;
        }

        //cuando queremos obtener informacion
        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> findAll()
        {
            return await context.Cliente.ToListAsync();
        }
        //queremos obtener solo la informacion de los de estado "true" habilitados
        [HttpGet("custom")]
        public async Task<ActionResult<List<Cliente>>> findAllCustom()
        {
            return await context.Cliente.Where(x => x.estado == true).ToListAsync();
        }

        //cuando queremos guardar informacion
        [HttpPost]
        public async Task<ActionResult> add(Cliente a)
        {
            context.Add(a);
            await context.SaveChangesAsync();
            return Ok();
        }

        //cuando queremos buscar informacion por el id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Cliente>> findById(int id)
        {
            var cliente = await context.Cliente.FirstOrDefaultAsync(x => x.id == id);
            return cliente;
        }

        //cuando queremos actualizar informaion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Cliente a, int id)
        {
            if (a.id != id)
            {
                return BadRequest("No se encontro el codigo correspondiente");
            }
            context.Update(a);
            await context.SaveChangesAsync();
            return Ok();
        }

        //cuando queremos "eliminar" informacion, cambiar el estado de la entidad a FALSO
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> delete(int id)
        {
            var existe = await context.Cliente.AnyAsync(x => x.id == id);
            if (!existe)
            {
                return NotFound();
            }
            var cliente = await context.Cliente.FirstOrDefaultAsync(x => x.id == id);
            cliente.estado = false;
            context.Update(cliente);
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}

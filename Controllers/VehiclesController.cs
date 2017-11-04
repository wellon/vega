using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly VegaDbContext _vegaDbContext;
        private readonly IMapper mapper;

        public VehiclesController(VegaDbContext vegaDbContext, IMapper _mapper)
        {
            this._vegaDbContext = vegaDbContext;
            this.mapper = _mapper;
        }

        [HttpPost]
        public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            return Ok(vehicle);
        }
    }
}